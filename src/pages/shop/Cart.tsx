import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CartProductImage } from "@/components/shop/CartProductImage";
import { CartQuantityControls } from "@/components/shop/CartQuantityControls";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const productPrice = 29.90;
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  
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

  const cardClassName = isMobile 
    ? "bg-background/95 border-white/10 max-w-4xl mx-auto overflow-visible"
    : "glass-card max-w-4xl mx-auto overflow-visible bg-black/40 backdrop-blur-xl border-white/10";

  const productCardClassName = isMobile
    ? "bg-background/95 rounded-xl p-6 md:p-8 border border-white/10"
    : "glass rounded-xl p-6 md:p-8 bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 ease-out group";

  const summaryCardClassName = isMobile
    ? "bg-background/95 rounded-xl p-6 md:p-8 border border-white/10"
    : "glass rounded-xl p-6 md:p-8 bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300";

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-background/95">
      <Navigation />
      <main className="container mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-12">
        <Card className={cardClassName}>
          <div className="p-6 md:p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 text-white/90" />
                <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white to-white/70">
                  {language === 'en' ? 'Your Cart' : 'Ihr Warenkorb'}
                </h1>
              </div>
            </div>

            {/* Product Card */}
            <div className="space-y-8">
              <div className={productCardClassName}>
                <div className="flex items-start gap-6">
                  <CartProductImage />
                  <div className="flex-1 min-w-0 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg md:text-xl text-white">
                        {language === 'en' ? "MYSTIC - The Card Game" : "MYSTIC - Das Kartenspiel"}
                      </h3>
                      <p className="text-base md:text-lg font-medium text-white/80 mt-1">
                        {productPrice.toFixed(2)} CHF
                      </p>
                    </div>
                    
                    <CartQuantityControls 
                      quantity={quantity}
                      onQuantityChange={handleQuantityChange}
                      onReset={() => setQuantity(1)}
                    />
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className={summaryCardClassName}>
                <div className="flex justify-between items-center text-xl 
                  font-semibold text-white">
                  <span>{language === 'en' ? 'Total' : 'Gesamt'}</span>
                  <span>{(quantity * productPrice).toFixed(2)} CHF</span>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-6">
                  <div className="space-y-2 text-center">
                    <p className="text-sm text-white">
                      {language === 'en' ? 
                        'Secure payment with SSL encryption' : 
                        'Sichere Bezahlung mit SSL-Verschlüsselung'}
                    </p>
                    <p className="text-sm text-white/80">
                      {language === 'en' ? 
                        'A-Post shipping included' : 
                        'A-Post Versand inbegriffen'}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <Button 
                      className="w-full h-12 md:h-14 text-base font-medium
                        bg-gradient-to-r from-white/20 to-white/10 
                        hover:from-white/30 hover:to-white/20
                        border border-white/20 hover:border-white/30
                        shadow-lg hover:shadow-xl 
                        transition-all duration-300
                        rounded-xl
                        group"
                      onClick={handleCheckout}
                      disabled={isLoading}
                    >
                      {isLoading ? 
                        (language === 'en' ? "Processing..." : "Wird verarbeitet...") : 
                        (language === 'en' ? "Proceed to Checkout" : "Zur Kasse")}
                    </Button>

                    <Button 
                      variant="outline" 
                      className="w-full h-12 md:h-14 text-base font-medium
                        bg-white/5 border-white/10 hover:bg-white/10 
                        hover:border-white/20 text-white
                        rounded-xl
                        transition-all duration-300
                        flex items-center justify-center gap-2"
                      onClick={() => navigate(-1)}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {language === 'en' ? 'Continue Shopping' : 'Weiter einkaufen'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Cart;
