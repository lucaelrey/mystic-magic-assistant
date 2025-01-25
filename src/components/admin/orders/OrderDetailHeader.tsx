import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface OrderDetailHeaderProps {
  onBack: () => void;
}

export const OrderDetailHeader = ({ onBack }: OrderDetailHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Package className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Bestelldetails</h1>
      </div>
      <Button
        variant="outline"
        onClick={onBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück
      </Button>
    </div>
  );
};