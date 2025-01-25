import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/number-input";
import { ShoppingCart } from "lucide-react";

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
  return (
    <div className="space-y-4 md:space-y-6 bg-black/20 backdrop-blur-lg 
      p-4 md:p-8 rounded-xl md:rounded-2xl border border-white/20 
      shadow-lg md:shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 justify-center">
        <span className="text-base md:text-lg font-medium text-white/90">
          Anzahl:
        </span>
        <div className="w-full md:w-32">
          <Input 
            value={quantity} 
            onChange={onQuantityChange} 
            min={1} 
            max={10}
            className="h-12 md:h-12 shadow-lg ring-white/30 
              hover:ring-white/40 focus-within:ring-primary/50
              w-48"
          />
        </div>
      </div>
      <Button 
        className="w-full h-12 md:h-14 text-base md:text-lg font-semibold 
          rounded-lg md:rounded-xl
          border border-white/20 hover:border-white/30
          transition-all duration-300 ease-out
          hover:scale-[1.02]
          group"
        onClick={onPurchase}
      >
        <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 
          transition-transform duration-300 group-hover:scale-110" />
        Jetzt kaufen
      </Button>
      <p className="text-xs md:text-sm font-medium text-white/60">
        Sichere Bezahlung mit SSL-Verschlüsselung
      </p>
    </div>
  );
};