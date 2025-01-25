import { Card } from "@/components/ui/card";
import { ShippingAddress } from "@/integrations/supabase/types/shipping";

interface OrderShippingAddressProps {
  shippingAddress: ShippingAddress;
}

export const OrderShippingAddress = ({ shippingAddress }: OrderShippingAddressProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">Lieferadresse</h3>
      <div className="space-y-1 text-sm">
        <p>{shippingAddress.street}</p>
        <p>{shippingAddress.postalCode} {shippingAddress.city}</p>
        <p>{shippingAddress.country}</p>
      </div>
    </Card>
  );
};