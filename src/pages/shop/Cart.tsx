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
  const productPrice = 29.99;
  
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
          shipping_address: null,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: orderData.id,
          product_name: "Mystic Grundspiel",
          quantity: quantity,
          price_per_unit: productPrice
        });

      if (itemError) throw itemError;

      // Create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          orderId: orderData.id,
          items: [{
            product_name: "Mystic Grundspiel",
            quantity: quantity,
            price_per_unit: productPrice
          }],
          total_amount: quantity * productPrice
        }
      });

      if (error) {
        console.error('Error during checkout:', error);
        throw new Error(error.message);
      }
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Keine Checkout URL erhalten');
      }
      
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