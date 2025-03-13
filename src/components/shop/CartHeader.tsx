
import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const CartHeader = () => {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center gap-3">
      <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 text-white/90" />
      <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-white to-white/70">
        {language === 'en' ? 'Your Cart' : 'Ihr Warenkorb'}
      </h1>
    </div>
  );
};
