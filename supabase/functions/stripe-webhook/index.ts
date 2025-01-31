import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from "npm:resend@2.0.0";

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  }
);

async function getAdminEmails() {
  const { data: adminRoles, error: rolesError } = await supabaseAdmin
    .from('user_roles')
    .select('user_id')
    .eq('role', 'admin');

  if (rolesError) {
    console.error('Error fetching admin roles:', rolesError);
    return [];
  }

  const adminIds = adminRoles.map(role => role.user_id);
  
  const { data: adminUsers, error: usersError } = await supabaseAdmin
    .auth.admin.listUsers();

  if (usersError) {
    console.error('Error fetching admin users:', usersError);
    return [];
  }

  return adminUsers.users
    .filter(user => adminIds.includes(user.id))
    .map(user => user.email)
    .filter(Boolean);
}

async function sendAdminNotification(orderDetails: any) {
  const adminEmails = await getAdminEmails();
  
  if (adminEmails.length === 0) {
    console.warn('No admin emails found to notify');
    return;
  }

  console.log('Sending admin notification to:', adminEmails);

  try {
    const emailResponse = await resend.emails.send({
      from: "MYSTIC Game <no-reply@transactional.mysticgame.ch>",
      to: adminEmails,
      subject: `Neue Bestellung #${orderDetails.orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              h1 {
                color: #1a1a1a;
                margin-bottom: 16px;
              }
              .order-details {
                background-color: #f5f5f5;
                padding: 16px;
                border-radius: 4px;
                margin: 16px 0;
              }
              .total {
                font-weight: bold;
                margin-top: 16px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Neue Bestellung eingegangen</h1>
              <p>Eine neue Bestellung wurde erfolgreich abgeschlossen und bezahlt.</p>
              
              <div class="order-details">
                <p><strong>Bestellnummer:</strong> ${orderDetails.orderId}</p>
                <p><strong>Gesamtbetrag:</strong> CHF ${orderDetails.totalAmount.toFixed(2)}</p>
                <p><strong>Kunde:</strong> ${orderDetails.customerName}</p>
                <p><strong>E-Mail:</strong> ${orderDetails.customerEmail}</p>
              </div>
              
              <p>Die Bestellung kann im Admin-Dashboard eingesehen werden.</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Admin notification sent successfully:', emailResponse);
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
}

async function sendOrderConfirmationEmail(orderDetails: any, language: string = 'de') {
  try {
    const { data: template, error: templateError } = await supabaseAdmin
      .from('email_templates')
      .select('*')
      .eq('type', 'order_confirmation')
      .eq('name', language === 'de' ? 'Bestellbestätigung' : 'Order Confirmation')
      .single();

    if (templateError) {
      console.error('Error fetching email template:', templateError);
      return;
    }

    const productList = orderDetails.items.map((item: any) => 
      `${item.product_name} - ${item.quantity}x - CHF ${item.price_per_unit.toFixed(2)}`
    ).join('\n');

    const formattedAddress = `${orderDetails.shippingAddress.firstName} ${orderDetails.shippingAddress.lastName}
${orderDetails.shippingAddress.street}
${orderDetails.shippingAddress.postalCode} ${orderDetails.shippingAddress.city}
${orderDetails.shippingAddress.country}`;

    let emailContent = template.html_content;
    let emailSubject = template.subject;
    
    const replacements = {
      '{{firstName}}': orderDetails.shippingAddress.firstName,
      '{{lastName}}': orderDetails.shippingAddress.lastName,
      '{{orderNumber}}': orderDetails.orderId,
      '{{totalAmount}}': orderDetails.totalAmount.toFixed(2),
      '{{productList}}': productList,
      '{{shippingAddress}}': formattedAddress
    };

    Object.entries(replacements).forEach(([key, value]) => {
      const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      emailContent = emailContent.replace(regex, value as string);
      emailSubject = emailSubject.replace(regex, value as string);
    });

    const emailResponse = await resend.emails.send({
      from: "MYSTIC Game <no-reply@transactional.mysticgame.ch>",
      to: [orderDetails.shippingAddress.email],
      subject: emailSubject,
      html: emailContent,
    });

    console.log('Order confirmation email sent successfully:', emailResponse);
    return emailResponse;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
}

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature');
    
    console.log('Received webhook request');
    
    if (!signature) {
      console.error('No Stripe signature found in request');
      return new Response('No signature', { status: 400 });
    }

    const body = await req.text();
    let event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed:`, err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    console.log(`✅ Received Stripe webhook event: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      console.log('Processing completed checkout session:', session.id);
      console.log('Order ID from metadata:', session.metadata?.order_id);

      const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['shipping_details', 'customer_details']
      });

      console.log('Shipping details:', expandedSession.shipping_details);
      console.log('Customer details:', expandedSession.customer_details);

      const fullName = expandedSession.shipping_details?.name || '';
      const [firstName = '', ...lastNameParts] = fullName.split(' ');
      const lastName = lastNameParts.join(' ');

      const shippingAddress = {
        firstName,
        lastName,
        street: expandedSession.shipping_details?.address?.line1 || '',
        city: expandedSession.shipping_details?.address?.city || '',
        postalCode: expandedSession.shipping_details?.address?.postal_code || '',
        country: expandedSession.shipping_details?.address?.country || '',
        email: expandedSession.customer_details?.email || '',
      };

      const language = shippingAddress.country === 'DE' || shippingAddress.country === 'AT' || shippingAddress.country === 'CH' ? 'de' : 'en';
      
      const { error: updateError } = await supabaseAdmin
        .from('orders')
        .update({ 
          payment_status: 'paid',
          payment_intent_id: session.payment_intent,
          shipping_address: shippingAddress,
          status: 'confirmed',
          updated_at: new Date().toISOString()
        })
        .eq('id', session.metadata?.order_id);

      if (updateError) {
        console.error('Error updating order:', updateError);
        return new Response('Error updating order', { status: 500 });
      }

      const { data: orderItems } = await supabaseAdmin
        .from('order_items')
        .select('*')
        .eq('order_id', session.metadata?.order_id);

      await sendOrderConfirmationEmail({
        orderId: session.metadata?.order_id,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
        shippingAddress,
        items: orderItems
      }, language);

      await sendAdminNotification({
        orderId: session.metadata?.order_id,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
        customerName: `${firstName} ${lastName}`,
        customerEmail: expandedSession.customer_details?.email,
      });

      console.log(`✅ Successfully processed order ${session.metadata?.order_id}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
    });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
});
