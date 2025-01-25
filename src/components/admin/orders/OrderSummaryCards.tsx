import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { PaymentStatusBadge } from "@/components/admin/PaymentStatusBadge";

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
        <h3 className="font-semibold mb-2">Bestellnummer</h3>
        <p className="font-mono">{order.id.split('-')[0]}</p>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Status</h3>
        <OrderStatusBadge status={order.status} />
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Zahlungsstatus</h3>
        <PaymentStatusBadge status={order.payment_status} />
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Datum</h3>
        <p>{format(new Date(order.created_at), 'dd.MM.yyyy HH:mm')}</p>
      </Card>
    </div>
  );
};