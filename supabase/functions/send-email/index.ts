import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string[];
  subject: string;
  html: string;
}

interface OrderEmailData {
  orderNumber: string;
  totalAmount: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    postalCode: string;
    city: string;
    country: string;
    email: string;
  };
  items: Array<{
    product_name: string;
    quantity: number;
    price_per_unit: number;
  }>;
}

const createOrderConfirmationEmail = (data: OrderEmailData) => {
  const formattedAmount = (data.totalAmount / 100).toFixed(2);
  
  return {
    subject: `Bestellbestätigung #${data.orderNumber}`,
    html: `
      <h1>Vielen Dank für deine Bestellung!</h1>
      <p>Hallo ${data.shippingAddress.firstName} ${data.shippingAddress.lastName},</p>
      <p>wir haben deine Bestellung #${data.orderNumber} erfolgreich erhalten.</p>
      
      <h2>Bestellübersicht:</h2>
      <ul>
        ${data.items.map(item => `
          <li>${item.product_name} - ${item.quantity}x CHF ${item.price_per_unit.toFixed(2)}</li>
        `).join('')}
      </ul>
      <p><strong>Gesamtbetrag: CHF ${formattedAmount}</strong></p>
      
      <h2>Lieferadresse:</h2>
      <p>
        ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
        ${data.shippingAddress.street}<br>
        ${data.shippingAddress.postalCode} ${data.shippingAddress.city}<br>
        ${data.shippingAddress.country}
      </p>
      
      <p>Wir werden dich informieren, sobald deine Bestellung versendet wurde.</p>
      
      <p>Beste Grüße,<br>Dein Mystic Team</p>
    `
  };
};

const createShippingConfirmationEmail = (data: OrderEmailData) => {
  return {
    subject: `Deine Bestellung #${data.orderNumber} wurde versandt`,
    html: `
      <h1>Deine Bestellung wurde versandt!</h1>
      <p>Hallo ${data.shippingAddress.firstName} ${data.shippingAddress.lastName},</p>
      <p>gute Nachrichten! Deine Bestellung #${data.orderNumber} wurde soeben versandt.</p>
      
      <h2>Lieferadresse:</h2>
      <p>
        ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
        ${data.shippingAddress.street}<br>
        ${data.shippingAddress.postalCode} ${data.shippingAddress.city}<br>
        ${data.shippingAddress.country}
      </p>
      
      <p>Wir wünschen dir viel Spaß mit deinem neuen Mystic Kartenspiel!</p>
      
      <p>Beste Grüße,<br>Dein Mystic Team</p>
    `
  };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, orderData } = await req.json();
    
    let emailContent;
    if (type === 'order_confirmation') {
      emailContent = createOrderConfirmationEmail(orderData);
    } else if (type === 'shipping_confirmation') {
      emailContent = createShippingConfirmationEmail(orderData);
    } else {
      throw new Error('Invalid email type');
    }

    const emailRequest: EmailRequest = {
      to: [orderData.shippingAddress.email],
      subject: emailContent.subject,
      html: emailContent.html,
    };

    console.log('Sending email:', emailRequest);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mystic <noreply@mystic-game.ch>",
        ...emailRequest,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Email sent successfully:', data);

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      const error = await res.text();
      console.error('Error sending email:', error);
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);