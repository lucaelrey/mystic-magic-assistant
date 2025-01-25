import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CartProductImage } from "@/components/shop/CartProductImage";
import { CartQuantityControls } from "@/components/shop/CartQuantityControls";
import { useLanguage } from "@/contexts/LanguageContext";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const productPrice = 29.90;
  const { language } = useLanguage();
  
  useEffect(() => {
    if (location.state?.quantity) {
      setQuantity(location.state.quantity);
    }
  }, [location.state?.quantity]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          total_amount: quantity * productPrice,
          status: 'pending',
          shipping_address: {
            street: "",
            city: "",
            postalCode: "",
            country: ""
          },
          payment_status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;
      if (!orderData) throw new Error(language === 'en' ? 'No order data returned' : 'Keine Bestelldaten zurückgegeben');

      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: orderData.id,
          product_name: language === 'en' ? "MYSTIC - The Card Game" : "MYSTIC - Das Kartenspiel",
          quantity: quantity,
          price_per_unit: productPrice
        });

      if (itemError) throw itemError;

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          orderId: orderData.id,
          items: [{
            product_name: language === 'en' ? "MYSTIC - The Card Game" : "MYSTIC - Das Kartenspiel",
            quantity: quantity,
            price_per_unit: productPrice
          }]
        }
      });

      if (error) throw error;
      if (!data?.url) throw new Error(language === 'en' ? 'No checkout URL received' : 'Keine Checkout URL erhalten');

      window.location.href = data.url;
      
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        title: language === 'en' ? "Error" : "Fehler",
        description: language === 'en' ? 
          "There was a problem creating the checkout session. Please try again." :
          "Es gab ein Problem beim Erstellen der Checkout-Session. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-background/95">
      <Navigation />
      <main className="container mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-12">
        <Card className="glass-card max-w-4xl mx-auto overflow-visible">
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent 
                bg-gradient-to-r from-white to-white/70">
                {language === 'en' ? 'Cart' : 'Warenkorb'}
              </h1>
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white/70" />
            </div>

            <div className="space-y-6">
              <div className="glass rounded-xl space-y-4 p-4 md:p-6">
                <div className="flex items-center gap-4">
                  <CartProductImage />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base md:text-lg text-white/90 truncate">
                      {language === 'en' ? "MYSTIC - The Card Game" : "MYSTIC - Das Kartenspiel"}
                    </h3>
                    <p className="text-sm md:text-base font-medium text-white/70">
                      {productPrice.toFixed(2)} CHF
                    </p>
                  </div>
                </div>
                
                <CartQuantityControls 
                  quantity={quantity}
                  onQuantityChange={handleQuantityChange}
                  onReset={() => setQuantity(1)}
                />
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="glass p-4 md:p-6 rounded-xl">
                <div className="flex justify-between items-center text-lg 
                  font-semibold text-white/90">
                  <span>{language === 'en' ? 'Total' : 'Gesamt'}</span>
                  <span>{(quantity * productPrice).toFixed(2)} CHF</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <Button 
                  variant="outline" 
                  className="w-full h-12 md:h-14 text-base font-medium
                    bg-white/5 border-white/10 hover:bg-white/10 
                    hover:border-white/20"
                  onClick={() => navigate(-1)}
                >
                  {language === 'en' ? 'Back to Shop' : 'Zurück zum Shop'}
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
                  {isLoading ? 
                    (language === 'en' ? "Loading..." : "Wird geladen...") : 
                    (language === 'en' ? "Checkout" : "Zur Kasse")}
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