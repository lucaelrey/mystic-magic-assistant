import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/number-input";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PurchaseModuleProps {
  quantity: number;
  onQuantityChange: (value: number) => void;
  onPurchase: () => void;
}

export const PurchaseModule = ({
  quantity,
  onQuantityChange,
  onPurchase,
}: PurchaseModuleProps) => {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-6 bg-white/5 backdrop-blur-lg 
      p-6 md:p-8 rounded-xl md:rounded-2xl 
      border border-white/10 hover:border-white/20
      shadow-lg hover:shadow-xl
      transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <span className="text-base md:text-lg font-medium text-white/90">
          {language === 'en' ? 'Quantity:' : 'Anzahl:'}
        </span>
        <div className="w-full md:w-32">
          <Input 
            value={quantity} 
            onChange={onQuantityChange} 
            min={1} 
            max={10}
            className="h-12 shadow-lg 
              bg-white/5 hover:bg-white/10
              border border-white/20 hover:border-white/30
              ring-white/20 hover:ring-white/30 focus-within:ring-white/40
              transition-all duration-300"
          />
        </div>
      </div>
      <Button 
        className="w-full h-12 md:h-14 text-base md:text-lg font-semibold 
          rounded-lg md:rounded-xl
          bg-white/10 hover:bg-white/15
          border border-white/20 hover:border-white/30
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-out
          hover:scale-[1.02]
          group"
        onClick={onPurchase}
      >
        <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 
          transition-transform duration-300 group-hover:scale-110" />
        {language === 'en' ? 'Buy Now' : 'Jetzt kaufen'}
      </Button>
      <p className="text-xs md:text-sm font-medium text-white/60 text-center">
        {language === 'en' ? 
          'Secure payment with SSL encryption' : 
          'Sichere Bezahlung mit SSL-Verschlüsselung'}
      </p>
    </div>
  );
};