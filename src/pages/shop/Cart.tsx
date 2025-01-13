import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [quantity, setQuantity] = useState(1);
  const productPrice = 29.99;
  
  useEffect(() => {
    // Überprüfe Authentifizierung
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        toast({
          title: "Anmeldung erforderlich",
          description: "Bitte melden Sie sich an, um fortzufahren.",
          variant: "destructive",
        });
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleCheckout = async () => {
    if (!session?.user) {
      toast({
        title: "Fehler",
        description: "Sie müssen angemeldet sein, um eine Bestellung aufzugeben.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Erstelle die Bestellung
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: session.user.id,
          total_amount: quantity * productPrice,
          shipping_address: {}, // Wird im nächsten Schritt ausgefüllt
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Erstelle die Bestellposition
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: order.id,
          product_name: "Mystic Grundspiel",
          quantity: quantity,
          price_per_unit: productPrice
        });

      if (itemError) throw itemError;

      toast({
        title: "Warenkorb aktualisiert",
        description: "Ihre Bestellung wurde erfolgreich erstellt.",
      });

      navigate("/checkout/address");
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Erstellen Ihrer Bestellung. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="glass-card max-w-4xl mx-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Warenkorb</h1>
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    alt="Mystic Grundspiel"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">Mystic Grundspiel</h3>
                    <p className="text-sm text-muted-foreground">{productPrice.toFixed(2)} €</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input 
                      type="number" 
                      value={quantity} 
                      className="w-16 text-center" 
                      min="1"
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setQuantity(1)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Gesamt</span>
                <span>{(quantity * productPrice).toFixed(2)} €</span>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(-1)}
                >
                  Zurück zum Shop
                </Button>
                <Button 
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Zur Kasse
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Cart;