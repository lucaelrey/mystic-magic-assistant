import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderData {
  orderNumber: string;
  totalAmount: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    email: string;
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

    // Fetch email template from database
    const { data: template, error: templateError } = await supabase
      .from('email_templates')
      .select('*')
      .eq('type', type)
      .single();

    if (templateError) {
      console.error("Error fetching template:", templateError);
      throw new Error(`Template not found for type: ${type}`);
    }

    console.log("Found template:", template);

    // Format items list for the email
    const productList = orderData.items.map(item => 
      `${item.product_name} - ${item.quantity}x - CHF ${item.price_per_unit.toFixed(2)}`
    ).join('\n');

    // Format shipping address for the email
    const formattedAddress = `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}
${orderData.shippingAddress.street}
${orderData.shippingAddress.postalCode} ${orderData.shippingAddress.city}
${orderData.shippingAddress.country}`;

    // Replace variables in template
    let emailContent = template.html_content;
    let emailSubject = template.subject;
    
    // Define replacements
    const replacements = {
      '{{firstName}}': orderData.shippingAddress.firstName,
      '{{lastName}}': orderData.shippingAddress.lastName,
      '{{orderNumber}}': orderData.orderNumber,
      '{{totalAmount}}': orderData.totalAmount.toFixed(2),
      '{{productList}}': productList,
      '{{shippingAddress}}': formattedAddress
    };

    // Replace all variables in both content and subject
    Object.entries(replacements).forEach(([key, value]) => {
      const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      emailContent = emailContent.replace(regex, value);
      emailSubject = emailSubject.replace(regex, value);
    });

    // Wrap the content in our base email template with proper styling
    const finalHtmlContent = `
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
            h1, h2, h3 {
              color: #1a1a1a;
              margin-bottom: 16px;
              margin-top: 32px;
            }
            h1:first-child {
              margin-top: 0;
            }
            p {
              margin: 16px 0;
            }
            .address {
              margin: 16px 0;
              padding: 16px;
              background-color: #f5f5f5;
              border-radius: 4px;
            }
            .product-list {
              margin: 16px 0;
            }
            .total {
              font-weight: bold;
              margin: 16px 0;
            }
            .footer {
              margin-top: 32px;
              padding-top: 16px;
              border-top: 1px solid #eaeaea;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            ${emailContent}
          </div>
        </body>
      </html>
    `;

    console.log("Processed email content:", finalHtmlContent);
    console.log("Final email subject:", emailSubject);

    const emailResponse = await resend.emails.send({
      from: "MYSTIC Game <no-reply@transactional.mysticgame.ch>",
      to: [orderData.shippingAddress.email],
      subject: emailSubject,
      html: finalHtmlContent,
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