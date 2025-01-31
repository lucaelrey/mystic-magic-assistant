import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import Stripe from "https://esm.sh/stripe@13.6.0";

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  httpClient: Stripe.createFetchHttpClient(),
});

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const getEmailTemplate = async (type: string, language: string) => {
  const { data: template, error } = await supabase
    .from('email_templates')
    .select('*')
    .eq('type', type)
    .eq('name', `${type}_${language}`)
    .single();

  if (error) throw error;
  return template;
};

const sendOrderConfirmationEmail = async (order: any, language: string) => {
  const template = await getEmailTemplate('order_confirmation', language);
  
  if (!template) {
    console.error(`Email template not found for language: ${language}`);
    return;
  }

  const shippingAddress = order.shipping_address;
  const orderItems = order.order_items;
  
  let itemsHtml = '';
  orderItems.forEach((item: any) => {
    itemsHtml += `
      <tr>
        <td style="padding: 10px;">${item.product_name}</td>
        <td style="padding: 10px;">${item.quantity}</td>
        <td style="padding: 10px;">CHF ${item.price_per_unit.toFixed(2)}</td>
        <td style="padding: 10px;">CHF ${(item.quantity * item.price_per_unit).toFixed(2)}</td>
      </tr>
    `;
  });

  const emailContent = template.html_content
    .replace('{{firstName}}', shippingAddress.firstName)
    .replace('{{lastName}}', shippingAddress.lastName)
    .replace('{{orderId}}', order.id)
    .replace('{{orderItems}}', itemsHtml)
    .replace('{{totalAmount}}', `CHF ${order.total_amount.toFixed(2)}`);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
    },
    body: JSON.stringify({
      from: 'Number Flow <no-reply@number-flow.ch>',
      to: shippingAddress.email,
      subject: template.subject,
      html: emailContent,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
};

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature') || '';
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';
    const body = await req.text();
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        return new Response('Order ID not found in session metadata', { status: 400 });
      }

      // Fetch order details including items
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('id', orderId)
        .single();

      if (orderError) {
        console.error('Error fetching order:', orderError);
        return new Response('Error fetching order details', { status: 500 });
      }

      // Update order status and payment status
      const { error: updateError } = await supabase
        .from('orders')
        .update({ 
          payment_status: 'paid',
          status: 'confirmed',
          payment_intent_id: session.payment_intent
        })
        .eq('id', orderId);

      if (updateError) {
        console.error('Error updating order:', updateError);
        return new Response('Error updating order status', { status: 500 });
      }

      // Determine email language based on shipping country
      const germanSpeakingCountries = ['DE', 'AT', 'CH'];
      const language = germanSpeakingCountries.includes(order.shipping_address.country) ? 'de' : 'en';

      // Send order confirmation email
      try {
        await sendOrderConfirmationEmail(order, language);
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't return error response here as the payment was successful
      }

      return new Response(JSON.stringify({ received: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
});