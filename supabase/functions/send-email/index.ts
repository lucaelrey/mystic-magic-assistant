import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    ).join('<br>');

    // Format shipping address for the email
    const formattedAddress = `
      ${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}<br>
      ${orderData.shippingAddress.street}<br>
      ${orderData.shippingAddress.postalCode} ${orderData.shippingAddress.city}<br>
      ${orderData.shippingAddress.country}
    `;

    // Replace variables in template
    let emailContent = template.html_content;
    
    // Replace all template variables with actual values
    const replacements = {
      '{{firstName}}': orderData.shippingAddress.firstName,
      '{{lastName}}': orderData.shippingAddress.lastName,
      '{{orderNumber}}': orderData.orderNumber,
      '{{totalAmount}}': orderData.totalAmount.toFixed(2),
      '{{productList}}': productList,
      '{{shippingAddress}}': formattedAddress
    };

    // Replace all variables in the template
    Object.entries(replacements).forEach(([key, value]) => {
      emailContent = emailContent.replace(new RegExp(key, 'g'), value);
    });

    // Replace subject variables as well
    let emailSubject = template.subject;
    Object.entries(replacements).forEach(([key, value]) => {
      emailSubject = emailSubject.replace(new RegExp(key, 'g'), value);
    });

    console.log("Processed email content:", emailContent);
    console.log("Final email subject:", emailSubject);

    const emailResponse = await resend.emails.send({
      from: "MYSTIC Game <no-reply@transactional.mysticgame.ch>",
      to: [orderData.shippingAddress.email],
      subject: emailSubject,
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