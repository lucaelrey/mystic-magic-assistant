import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderData {
  orderNumber: string;
  totalAmount: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    product_name: string;
    quantity: number;
    price_per_unit: number;
  }>;
}

interface EmailRequest {
  type: string;
  orderData: OrderData;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, orderData }: EmailRequest = await req.json();
    console.log("Sending email for type:", type);
    console.log("Order data:", orderData);

    let emailContent;
    let subject;

    switch (type) {
      case "order_confirmation":
        subject = "Bestellbestätigung - MYSTIC Kartenspiel";
        emailContent = `
          <h1>Vielen Dank für Ihre Bestellung!</h1>
          <p>Sehr geehrte(r) ${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName},</p>
          <p>Wir haben Ihre Bestellung #${orderData.orderNumber} erfolgreich erhalten.</p>
          
          <h2>Bestellübersicht:</h2>
          ${orderData.items.map(item => `
            <p>${item.product_name} - ${item.quantity}x - CHF ${item.price_per_unit.toFixed(2)}</p>
          `).join('')}
          
          <p><strong>Gesamtbetrag: CHF ${orderData.totalAmount.toFixed(2)}</strong></p>
          
          <h2>Lieferadresse:</h2>
          <p>
            ${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}<br>
            ${orderData.shippingAddress.street}<br>
            ${orderData.shippingAddress.postalCode} ${orderData.shippingAddress.city}<br>
            ${orderData.shippingAddress.country}
          </p>
          
          <p>Wir werden Ihre Bestellung schnellstmöglich bearbeiten und versenden.</p>
          <p>Mit freundlichen Grüssen<br>Ihr MYSTIC Team</p>
        `;
        break;

      case "shipping_confirmation":
        subject = "Versandbestätigung - MYSTIC Kartenspiel";
        emailContent = `
          <h1>Ihre Bestellung wurde versendet!</h1>
          <p>Sehr geehrte(r) ${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName},</p>
          <p>Ihre Bestellung #${orderData.orderNumber} wurde soeben versendet.</p>
          
          <p>Die Lieferung erfolgt an:</p>
          <p>
            ${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}<br>
            ${orderData.shippingAddress.street}<br>
            ${orderData.shippingAddress.postalCode} ${orderData.shippingAddress.city}<br>
            ${orderData.shippingAddress.country}
          </p>
          
          <p>Mit freundlichen Grüssen<br>Ihr MYSTIC Team</p>
        `;
        break;

      default:
        throw new Error(`Unbekannter E-Mail-Typ: ${type}`);
    }

    const emailResponse = await resend.emails.send({
      from: "MYSTIC Game <no-reply@transactional.mysticgame.ch>",
      to: [orderData.shippingAddress.email],
      subject: subject,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);