import { Package } from "lucide-react";

export const OrdersHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <Package className="h-6 w-6 text-primary" />
      <h1 className="text-2xl font-bold">Bezahlte Bestellungen</h1>
    </div>
  );
};