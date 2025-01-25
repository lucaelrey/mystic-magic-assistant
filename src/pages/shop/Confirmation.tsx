import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Home, Package, CreditCard, MapPin, Mail } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShippingAddress } from "@/integrations/supabase/types/shipping";
import { supabase } from "@/integrations/supabase/client";

interface OrderDetails {
  orderNumber: string;
  productName: string;
  amount: number;
  shippingAddress?: ShippingAddress;
  paymentStatus?: string;
  items?: Array<{
    product_name: string;
    quantity: number;
    price_per_unit: number;
  }>;
}

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/get-order-details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        setOrderDetails(data);

        // Send confirmation email
        if (data.shippingAddress?.email) {
          const emailResponse = await supabase.functions.invoke('send-email', {
            body: {
              type: 'order_confirmation',
              orderData: {
                orderNumber: data.orderNumber,
                totalAmount: data.amount,
                shippingAddress: data.shippingAddress,
                items: data.items || [{
                  product_name: data.productName,
                  quantity: 1,
                  price_per_unit: data.amount / 100
                }]
              }
            }
          });

          if (emailResponse.error) {
            console.error('Error sending confirmation email:', emailResponse.error);
            toast({
              title: "Hinweis",
              description: "Die Bestellbestätigung wurde erstellt, aber die E-Mail konnte nicht gesendet werden.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast({
          title: "Fehler",
          description: "Die Bestelldetails konnten nicht geladen werden.",
          variant: "destructive",
        });
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, toast]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="glass-card max-w-3xl mx-auto">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-center">
              Vielen Dank für deine Bestellung!
            </h1>
            
            <p className="text-muted-foreground mb-8 text-center">
              Wir haben deine Bestellung erhalten und werden sie schnellstmöglich bearbeiten. 
              Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold">Bestellübersicht</h2>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bestellnummer</span>
                      <span className="font-mono">#{orderDetails?.orderNumber || '...'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Produkt</span>
                      <span>{orderDetails?.productName || 'MYSTIC - Das Kartenspiel'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gesamtbetrag</span>
                      <span>CHF {orderDetails?.amount ? (orderDetails.amount / 100).toFixed(2) : '24.90'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold">Zahlungsstatus</h2>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100/10 text-green-500">
                    Bezahlt
                  </span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold">Lieferadresse</h2>
                </div>
                {orderDetails?.shippingAddress ? (
                  <div className="space-y-2 text-sm">
                    <p>{orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}</p>
                    <p>{orderDetails.shippingAddress.street}</p>
                    <p>{orderDetails.shippingAddress.postalCode} {orderDetails.shippingAddress.city}</p>
                    <p>{orderDetails.shippingAddress.country}</p>
                    {orderDetails.shippingAddress.email && (
                      <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{orderDetails.shippingAddress.email}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Lädt...</p>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Link to="/">
                <Button className="gap-2">
                  <Home className="w-4 h-4" />
                  Zurück zur Startseite
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Confirmation;