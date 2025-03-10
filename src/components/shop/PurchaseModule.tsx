
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { NumberInput } from "@/components/ui/number-input";

export const PurchaseModule = () => {
  const [quantity, setQuantity] = useState(1);
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const stripeCheckoutUrl = "https://buy.stripe.com/7sI8zr3D8cTmgAEaEE";

  const handleBuyNow = () => {
    // Open Stripe checkout in a new tab
    window.open(stripeCheckoutUrl, "_blank");
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
        onClick={handleBuyNow}
        className="w-full glass-button text-base md:text-lg py-6"
      >
        {language === 'en' ? 'Buy Now' : 'Jetzt Kaufen'}
      </Button>
    </div>
  );
};
