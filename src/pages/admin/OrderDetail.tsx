import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { OrderDetailHeader } from "@/components/admin/orders/OrderDetailHeader";
import { OrderSummaryCards } from "@/components/admin/orders/OrderSummaryCards";
import { OrderShippingAddress } from "@/components/admin/orders/OrderShippingAddress";
import { OrderItemsTable } from "@/components/admin/orders/OrderItemsTable";

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
        .eq('payment_status', 'paid')
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

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="p-6">
          <OrderDetailHeader onBack={handleBack} />

          {isLoading ? (
            <div className="text-center py-8">Lädt...</div>
          ) : order ? (
            <div className="space-y-6">
              <OrderSummaryCards order={order} />
              <OrderShippingAddress shippingAddress={order.shipping_address} />
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Bestellte Artikel</h3>
                <OrderItemsTable 
                  orderItems={order.order_items} 
                  totalAmount={order.total_amount} 
                />
              </Card>
            </div>
          ) : (
            <div className="text-center py-8">
              Bestellung nicht gefunden oder nicht bezahlt
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default OrderDetail;