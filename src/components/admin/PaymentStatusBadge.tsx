import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PaymentStatusBadgeProps {
  status: string;
}

export const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const variant = status === 'paid' ? 'default' : 'secondary';
  const label = status === 'paid' ? 'Bezahlt' : 'Ausstehend';
  
  return (
    <Badge variant={variant}>
      <CreditCard className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
};