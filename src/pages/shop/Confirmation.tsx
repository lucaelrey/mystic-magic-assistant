import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Home } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface OrderDetails {
  orderNumber: string;
  productName: string;
  amount: number;
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
        <Card className="glass-card max-w-2xl mx-auto">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">
              Vielen Dank für deine Bestellung!
            </h1>
            
            <p className="text-muted-foreground mb-8">
              Wir haben deine Bestellung erhalten und werden sie schnellstmöglich bearbeiten. 
              Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details.
            </p>

            <div className="bg-white/5 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-4">Bestellübersicht</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Bestellnummer</span>
                  <span className="font-mono">#{orderDetails?.orderNumber || '...'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Produkt</span>
                  <span>{orderDetails?.productName || 'MYSTIC - Das Kartenspiel'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gesamtbetrag</span>
                  <span>CHF {orderDetails?.amount ? (orderDetails.amount / 100).toFixed(2) : '24.90'}</span>
                </div>
              </div>
            </div>

            <Link to="/">
              <Button className="gap-2">
                <Home className="w-4 h-4" />
                Zurück zur Startseite
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Confirmation;