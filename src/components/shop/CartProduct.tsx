import { CartProductImage } from "./CartProductImage";
import { CartQuantityControls } from "./CartQuantityControls";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartProductProps {
  quantity: number;
  productPrice: number;
  onQuantityChange: (change: number) => void;
  onReset: () => void;
}

export const CartProduct = ({
  quantity,
  productPrice,
  onQuantityChange,
  onReset
}: CartProductProps) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-start gap-6">
      <CartProductImage />
      <div className="flex-1 min-w-0 space-y-4">
        <div>
          <h3 className="font-semibold text-lg md:text-xl text-white">
            {language === 'en' ? "MYSTIC - The Card Game" : "MYSTIC - Das Kartenspiel"}
          </h3>
          <p className="text-base md:text-lg font-medium text-white/80 mt-1">
            CHF {productPrice.toFixed(2)}
          </p>
        </div>
        
        <CartQuantityControls 
          quantity={quantity}
          onQuantityChange={onQuantityChange}
          onReset={onReset}
        />
      </div>
    </div>
  );
};