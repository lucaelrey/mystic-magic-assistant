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
    subject: `Bestellbestätigung #${data.orderNumber} - Mystic Kartenspiel`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .order-details { background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .product-list { margin: 20px 0; }
          .total { font-weight: bold; font-size: 1.1em; margin-top: 20px; }
          .footer { margin-top: 30px; text-align: center; color: #666; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Vielen Dank für deine Bestellung!</h1>
          </div>
          
          <p>Hallo ${data.shippingAddress.firstName} ${data.shippingAddress.lastName},</p>
          
          <p>wir freuen uns, dir mitteilen zu können, dass wir deine Bestellung <strong>#${data.orderNumber}</strong> erfolgreich erhalten haben.</p>
          
          <div class="order-details">
            <h2>Bestellübersicht:</h2>
            <div class="product-list">
              ${data.items.map(item => `
                <div>
                  <p>${item.product_name}<br>
                  Menge: ${item.quantity}x<br>
                  Preis pro Stück: CHF ${item.price_per_unit.toFixed(2)}</p>
                </div>
              `).join('')}
            </div>
            <div class="total">
              Gesamtbetrag: CHF ${formattedAmount}
            </div>
          </div>
          
          <div class="shipping-address">
            <h2>Lieferadresse:</h2>
            <p>
              ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
              ${data.shippingAddress.street}<br>
              ${data.shippingAddress.postalCode} ${data.shippingAddress.city}<br>
              ${data.shippingAddress.country}
            </p>
          </div>
          
          <p>Wir werden deine Bestellung sorgfältig verpacken und schnellstmöglich versenden. 
          Sobald dein Paket unterwegs ist, erhältst du von uns eine weitere E-Mail.</p>
          
          <p>Falls du Fragen zu deiner Bestellung hast, antworte einfach auf diese E-Mail.</p>
          
          <div class="footer">
            <p>Herzliche Grüße,<br>
            Dein Mystic Team</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

const createShippingConfirmationEmail = (data: OrderEmailData) => {
  return {
    subject: `Deine Bestellung #${data.orderNumber} wurde versandt - Mystic Kartenspiel`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .shipping-info { background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { margin-top: 30px; text-align: center; color: #666; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Deine Bestellung ist unterwegs!</h1>
          </div>
          
          <p>Hallo ${data.shippingAddress.firstName} ${data.shippingAddress.lastName},</p>
          
          <p>gute Nachrichten! Deine Bestellung <strong>#${data.orderNumber}</strong> wurde soeben versandt.</p>
          
          <div class="shipping-info">
            <h2>Lieferadresse:</h2>
            <p>
              ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
              ${data.shippingAddress.street}<br>
              ${data.shippingAddress.postalCode} ${data.shippingAddress.city}<br>
              ${data.shippingAddress.country}
            </p>
          </div>
          
          <p>Die Lieferung erfolgt in der Regel innerhalb von 2-3 Werktagen.</p>
          
          <p>Wir wünschen dir viel Spaß mit deinem neuen Mystic Kartenspiel!</p>
          
          <div class="footer">
            <p>Herzliche Grüße,<br>
            Dein Mystic Team</p>
          </div>
        </div>
      </body>
      </html>
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
        from: "Mystic <onboarding@resend.dev>", // Changed this line to use Resend's default domain
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