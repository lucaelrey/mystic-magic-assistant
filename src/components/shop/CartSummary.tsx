import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  quantity: number;
  productPrice: number;
  onCheckout: () => void;
  isLoading: boolean;
}

export const CartSummary = ({ 
  quantity, 
  productPrice, 
  onCheckout, 
  isLoading 
}: CartSummaryProps) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xl font-semibold text-white">
        <span>{language === 'en' ? 'Total' : 'Gesamt'}</span>
        <span>CHF {(quantity * productPrice).toFixed(2)}</span>
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
            onClick={onCheckout}
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
  );
};