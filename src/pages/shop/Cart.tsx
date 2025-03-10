
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartHeader } from "@/components/shop/CartHeader";
import { CartProduct } from "@/components/shop/CartProduct";
import { CartSummary } from "@/components/shop/CartSummary";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const productPrice = 24.90;
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
      
      // Redirect to the Stripe checkout page
      window.location.href = "https://buy.stripe.com/7sI8zr3D8cTmgAEaEE";
      
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        title: language === 'en' ? "Error" : "Fehler",
        description: language === 'en' ? 
          "There was a problem redirecting to checkout. Please try again." :
          "Es gab ein Problem bei der Weiterleitung zum Checkout. Bitte versuchen Sie es erneut.",
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
            <div className="flex items-center justify-between">
              <CartHeader />
            </div>

            <div className="space-y-8">
              <div className={productCardClassName}>
                <CartProduct 
                  quantity={quantity}
                  productPrice={productPrice}
                  onQuantityChange={handleQuantityChange}
                  onReset={() => setQuantity(1)}
                />
              </div>

              <div className={summaryCardClassName}>
                <CartSummary 
                  quantity={quantity}
                  productPrice={productPrice}
                  onCheckout={handleCheckout}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Cart;
