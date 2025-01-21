import { Badge } from "@/components/ui/badge";

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

interface OrderStatusBadgeProps {
  status: string;
}

const statusConfig: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Ausstehend", variant: "outline" },
  confirmed: { label: "Bestätigt", variant: "secondary" },
  shipped: { label: "Versendet", variant: "default" },
  delivered: { label: "Geliefert", variant: "default" },
  cancelled: { label: "Storniert", variant: "destructive" },
};

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const config = statusConfig[status as OrderStatus] || { label: status, variant: "outline" };

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};