import { Card } from "@/components/ui/card";
import { ShippingAddress } from "@/integrations/supabase/types/shipping";
import { Json } from "@/integrations/supabase/types/json";

interface OrderShippingAddressProps {
  shippingAddress: Json;
}

export const OrderShippingAddress = ({ shippingAddress }: OrderShippingAddressProps) => {
  // Cast the Json type to ShippingAddress
  const address = shippingAddress as ShippingAddress;
  
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">Lieferadresse</h3>
      <div className="space-y-1 text-sm">
        <p className="font-medium">{address.firstName} {address.lastName}</p>
        <p>{address.street}</p>
        <p>{address.postalCode} {address.city}</p>
        <p>{address.country}</p>
        {address.phone && <p>Tel: {address.phone}</p>}
        {address.email && <p>Email: {address.email}</p>}
      </div>
    </Card>
  );
};