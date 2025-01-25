import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { PaymentStatusBadge } from "@/components/admin/PaymentStatusBadge";
import { Package, Calendar, Hash, CreditCard } from "lucide-react";

interface OrderSummaryCardsProps {
  order: {
    id: string;
    status: string;
    payment_status: string;
    created_at: string;
  };
}

export const OrderSummaryCards = ({ order }: OrderSummaryCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Hash className="h-4 w-4" />
            <h3 className="font-medium text-left">Bestellnummer</h3>
          </div>
          <p className="font-mono text-sm text-left">{order.id.split('-')[0]}</p>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="h-4 w-4" />
            <h3 className="font-medium text-left">Status</h3>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            <h3 className="font-medium text-left">Zahlungsstatus</h3>
          </div>
          <PaymentStatusBadge status={order.payment_status} />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <h3 className="font-medium text-left">Datum</h3>
          </div>
          <p className="text-sm text-left">{format(new Date(order.created_at), 'dd.MM.yyyy HH:mm')}</p>
        </div>
      </Card>
    </div>
  );
};