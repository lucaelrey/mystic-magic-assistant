import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const productPrice = 24.90;
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          total_amount: quantity * productPrice,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw orderError;
      }

      if (!orderData) {
        throw new Error('No order data returned');
      }

      // Create order items
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: orderData.id,
          product_name: "MYSTIC - Das Kartenspiel",
          quantity: quantity,
          price_per_unit: productPrice
        });

      if (itemError) {
        console.error('Error creating order items:', itemError);
        throw itemError;
      }

      // Create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          orderId: orderData.id,
          items: [{
            product_name: "MYSTIC - Das Kartenspiel",
            quantity: quantity,
            price_per_unit: productPrice
          }]
        }
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        throw error;
      }

      if (!data?.url) {
        throw new Error('Keine Checkout URL erhalten');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Erstellen der Checkout-Session. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navigation />
      <main className="container mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-12">
        <Card className="glass-card max-w-4xl mx-auto overflow-visible">
          <div className="p-4 md:p-8">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
                bg-gradient-to-r from-white to-white/70">
                Warenkorb
              </h1>
              <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-white/70" />
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="glass p-4 rounded-xl space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden 
                    bg-white/5 backdrop-blur-lg">
                    <img
                      src="/lovable-uploads/cf7eccbe-9b33-4e52-aadf-a9bf531ba57b.png"
                      alt="MYSTIC - Das Kartenspiel"
                      className="w-full h-full object-contain p-2 rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg md:text-xl text-white/90 truncate">
                      MYSTIC - Das Kartenspiel
                    </h3>
                    <p className="text-base md:text-lg font-medium text-white/70">
                      {productPrice.toFixed(2)} CHF
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      className="h-10 w-10 rounded-lg bg-white/5 border-white/10 
                        hover:bg-white/10 hover:border-white/20"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input 
                      type="number" 
                      value={quantity} 
                      className="w-20 text-center h-10 bg-white/5 border-white/10 
                        focus:border-white/20 focus:ring-white/20"
                      min="1"
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                      className="h-10 w-10 rounded-lg bg-white/5 border-white/10 
                        hover:bg-white/10 hover:border-white/20"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(1)}
                    className="self-center text-white/60 hover:text-white/80 
                      hover:bg-white/5"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Entfernen
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
              <div className="glass p-4 rounded-xl">
                <div className="flex justify-between items-center text-lg md:text-xl 
                  font-semibold text-white/90">
                  <span>Gesamt</span>
                  <span>{(quantity * productPrice).toFixed(2)} CHF</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                <Button 
                  variant="outline" 
                  className="w-full h-12 md:h-14 text-base font-medium
                    bg-white/5 border-white/10 hover:bg-white/10 
                    hover:border-white/20"
                  onClick={() => navigate(-1)}
                >
                  Zurück zum Shop
                </Button>
                <Button 
                  className="w-full h-12 md:h-14 text-base font-medium
                    bg-gradient-to-r from-white/20 to-white/10 
                    hover:from-white/30 hover:to-white/20
                    border border-white/20 hover:border-white/30
                    shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? "Wird geladen..." : "Zur Kasse"}
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