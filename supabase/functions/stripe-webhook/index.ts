import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

// Initialize Supabase client with service role key
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

      // Retrieve the complete session to get shipping details
      const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['shipping_details', 'customer_details']
      });

      console.log('Shipping details:', expandedSession.shipping_details);
      console.log('Customer details:', expandedSession.customer_details);

      // Split the name into first and last name
      const fullName = expandedSession.shipping_details?.name || '';
      const [firstName = '', ...lastNameParts] = fullName.split(' ');
      const lastName = lastNameParts.join(' ');

      // Prepare shipping address data
      const shippingAddress = {
        firstName,
        lastName,
        street: expandedSession.shipping_details?.address?.line1 || '',
        city: expandedSession.shipping_details?.address?.city || '',
        postalCode: expandedSession.shipping_details?.address?.postal_code || '',
        country: expandedSession.shipping_details?.address?.country || '',
        email: expandedSession.customer_details?.email || '',
      };
      
      // Update order payment status and shipping address in database
      const { error } = await supabaseAdmin
        .from('orders')
        .update({ 
          payment_status: 'paid',
          payment_intent_id: session.payment_intent,
          shipping_address: shippingAddress,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.metadata?.order_id);

      if (error) {
        console.error('Error updating order:', error);
        return new Response('Error updating order', { status: 500 });
      }

      console.log(`✅ Successfully updated order ${session.metadata?.order_id} with shipping details and payment status`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
    });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
});