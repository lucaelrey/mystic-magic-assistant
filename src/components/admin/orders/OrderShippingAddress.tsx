import { Card } from "@/components/ui/card";
import { ShippingAddress } from "@/integrations/supabase/types/shipping";
import { Json } from "@/integrations/supabase/types/json";
import { Mail, Phone, User } from "lucide-react";

interface OrderShippingAddressProps {
  shippingAddress: Json;
}

export const OrderShippingAddress = ({ shippingAddress }: OrderShippingAddressProps) => {
  const address = shippingAddress as ShippingAddress;
  
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4 text-left">Lieferadresse</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="h-4 w-4 text-muted-foreground mt-1" />
          <p className="font-medium text-left">{address.firstName} {address.lastName}</p>
        </div>
        
        <div className="pl-7 space-y-1 text-sm text-left">
          <p>{address.street}</p>
          <p>{address.postalCode} {address.city}</p>
          <p>{address.country}</p>
        </div>

        {address.email && (
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-muted-foreground mt-1" />
            <p className="text-sm text-left">{address.email}</p>
          </div>
        )}
        
        {address.phone && (
          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 text-muted-foreground mt-1" />
            <p className="text-sm text-left">{address.phone}</p>
          </div>
        )}
      </div>
    </Card>
  );
};