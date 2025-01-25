import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { OrdersHeader } from "@/components/admin/orders/OrdersHeader";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Orders = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('payment_status', 'paid')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Fehler",
          description: "Die Bestellungen konnten nicht geladen werden.",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  const handleViewOrder = (orderId: string) => {
    navigate(`/admin/orders/${orderId}`);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/admin")}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <OrdersHeader />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Lädt...</div>
          ) : (
            <OrdersTable orders={orders} onViewOrder={handleViewOrder} />
          )}
        </Card>
      </main>
    </div>
  );
};

export default Orders;