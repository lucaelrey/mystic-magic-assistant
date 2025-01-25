import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { OrderDetailHeader } from "@/components/admin/orders/OrderDetailHeader";
import { OrderSummaryCards } from "@/components/admin/orders/OrderSummaryCards";
import { OrderShippingAddress } from "@/components/admin/orders/OrderShippingAddress";
import { OrderItemsTable } from "@/components/admin/orders/OrderItemsTable";
import { OrderStatusSelect } from "@/components/admin/orders/OrderStatusSelect";

const OrderDetail = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const queryClient = useQueryClient();

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
        .single();

      if (error) {
        toast({
          title: "Fehler",
          description: "Die Bestellung konnte nicht geladen werden.",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  const handleStatusChange = async (newStatus: string) => {
    await queryClient.invalidateQueries({ queryKey: ['admin-order', orderId] });
  };

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
              
              <Card className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">Bestellstatus</h3>
                  <OrderStatusSelect 
                    orderId={order.id}
                    currentStatus={order.status}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              </Card>

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
              Bestellung nicht gefunden
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default OrderDetail;