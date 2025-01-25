import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartQuantityControlsProps {
  quantity: number;
  onQuantityChange: (change: number) => void;
  onReset: () => void;
}

export const CartQuantityControls = ({
  quantity,
  onQuantityChange,
  onReset,
}: CartQuantityControlsProps) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onQuantityChange(-1)}
          className="h-8 w-8 md:h-10 md:w-10 rounded-lg 
            bg-white/5 border-white/10 
            hover:bg-white/10 hover:border-white/20
            transition-all duration-300"
        >
          <Minus className="w-3 h-3 md:w-4 md:h-4 text-white" />
        </Button>
        <Input 
          type="number" 
          value={quantity} 
          className="w-16 md:w-20 text-center h-8 md:h-10 
            bg-white/5 border-white/10 
            focus:border-white/20 focus:ring-white/20
            text-white"
          min="1"
          onChange={(e) => onQuantityChange(parseInt(e.target.value) - quantity)}
        />
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onQuantityChange(1)}
          className="h-8 w-8 md:h-10 md:w-10 rounded-lg 
            bg-white/5 border-white/10 
            hover:bg-white/10 hover:border-white/20
            transition-all duration-300"
        >
          <Plus className="w-3 h-3 md:w-4 md:h-4 text-white" />
        </Button>
      </div>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onReset}
        className="self-start text-white/60 hover:text-white/80 
          hover:bg-white/5
          transition-all duration-300
          group"
      >
        <Trash2 className="w-3 h-3 md:w-4 md:h-4 mr-2 
          group-hover:scale-110 transition-transform duration-300" />
        {language === 'en' ? 'Remove' : 'Entfernen'}
      </Button>
    </div>
  );
};