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
        <p>{address.street}</p>
        <p>{address.postalCode} {address.city}</p>
        <p>{address.country}</p>
      </div>
    </Card>
  );
};