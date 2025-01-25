import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, Package, CreditCard } from "lucide-react";
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ShippingAddress } from "@/integrations/supabase/types/shipping";
import { Badge } from "@/components/ui/badge";

const PaymentStatusBadge = ({ status }: { status: string }) => {
  const variant = status === 'paid' ? 'default' : 'secondary';
  const label = status === 'paid' ? 'Bezahlt' : 'Ausstehend';
  
  return (
    <Badge variant={variant}>
      <CreditCard className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
};

const OrderDetail = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ['admin-order', orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('id', orderId)
        .eq('payment_status', 'paid') // Nur bezahlte Bestellungen laden
        .single();

      if (error) {
        toast({
          title: "Fehler",
          description: "Die Bestellung konnte nicht geladen werden oder ist nicht bezahlt.",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  const handleBack = () => {
    navigate('/admin/orders');
  };

  const shippingAddress = order?.shipping_address as ShippingAddress;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Bestelldetails</h1>
            </div>
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Lädt...</div>
          ) : order ? (
            <div className="space-y-6">
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

              <Card className="p-4">
                <h3 className="font-semibold mb-2">Lieferadresse</h3>
                <div className="space-y-1 text-sm">
                  <p>{shippingAddress.street}</p>
                  <p>{shippingAddress.postalCode} {shippingAddress.city}</p>
                  <p>{shippingAddress.country}</p>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Bestellte Artikel</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Artikel</TableHead>
                      <TableHead>Menge</TableHead>
                      <TableHead>Preis pro Stück</TableHead>
                      <TableHead>Gesamtpreis</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.order_items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.product_name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>CHF {item.price_per_unit.toFixed(2)}</TableCell>
                        <TableCell>
                          CHF {(item.quantity * item.price_per_unit).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-semibold">
                        Gesamtbetrag:
                      </TableCell>
                      <TableCell className="font-semibold">
                        CHF {order.total_amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </div>
          ) : (
            <div className="text-center py-8">Bestellung nicht gefunden oder nicht bezahlt</div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default OrderDetail;