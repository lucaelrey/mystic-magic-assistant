import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { NumberInput } from "@/components/ui/number-input";
import { useIsMobile } from "@/hooks/use-mobile";

export const PurchaseModule = () => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const handleAddToCart = () => {
    toast({
      title: language === 'en' ? 'Added to Cart' : 'In den Warenkorb gelegt',
      description: `${quantity} ${language === 'en' ? 'item(s)' : 'Artikel'} added to your cart.`,
    });
    navigate("/shop/cart");
  };

  const moduleClassName = isMobile
    ? "space-y-6 bg-black/80 p-6 rounded-xl md:rounded-2xl border border-white/10"
    : "space-y-6 bg-gradient-to-b from-white/15 to-white/10 backdrop-blur-[2px] backdrop-saturate-150 p-6 rounded-xl md:rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300";

  return (
    <div className={moduleClassName}>
      <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-6">
        <span className="text-base md:text-lg font-medium text-white">
          {language === 'en' ? 'Quantity:' : 'Anzahl:'}
        </span>
        <NumberInput
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={99}
          className="w-32"
        />
      </div>

      <Button 
        onClick={handleAddToCart}
        className="w-full glass-button text-base md:text-lg py-6"
      >
        {language === 'en' ? 'Add to Cart' : 'In den Warenkorb'}
      </Button>
    </div>
  );
};