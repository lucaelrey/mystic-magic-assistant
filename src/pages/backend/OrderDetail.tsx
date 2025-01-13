import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth?returnTo=/backend/orders/" + id);
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (!roles || roles.role !== "admin") {
        toast({
          variant: "destructive",
          title: "Zugriff verweigert",
          description: "Sie haben keine Berechtigung für den Admin-Bereich.",
        });
        navigate("/");
      }
    };

    checkAdminStatus();
  }, [navigate, toast, id]);

  // Fetch order details
  const { data: order, isLoading } = useQuery({
    queryKey: ["admin-order", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (*)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Update order status
  const updateStatus = useMutation({
    mutationFn: async (newStatus: string) => {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Status aktualisiert",
        description: "Der Bestellstatus wurde erfolgreich aktualisiert.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Der Status konnte nicht aktualisiert werden.",
      });
    },
  });

  if (isLoading) {
    return <div>Lädt...</div>;
  }

  if (!order) {
    return <div>Bestellung nicht gefunden</div>;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/backend")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur Übersicht
        </Button>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Bestelldetails</CardTitle>
              <CardDescription>
                Bestellt am {format(new Date(order.created_at), "PPp", { locale: de })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-medium">Bestellnummer</p>
                  <p className="text-sm text-muted-foreground">{order.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Select
                    defaultValue={order.status}
                    onValueChange={(value) => updateStatus.mutate(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status ändern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Ausstehend</SelectItem>
                      <SelectItem value="processing">In Bearbeitung</SelectItem>
                      <SelectItem value="completed">Abgeschlossen</SelectItem>
                      <SelectItem value="cancelled">Storniert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Lieferadresse</h3>
                  {order.shipping_address && (
                    <div className="text-sm text-muted-foreground">
                      <p>{order.shipping_address.street}</p>
                      <p>{order.shipping_address.city}, {order.shipping_address.postalCode}</p>
                      <p>{order.shipping_address.country}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-2">Bestellte Artikel</h3>
                  <div className="space-y-2">
                    {order.order_items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-2 border-b"
                      >
                        <div>
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-sm text-muted-foreground">
                            Menge: {item.quantity}
                          </p>
                        </div>
                        <p>CHF {item.price_per_unit * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="font-medium">Gesamtbetrag</p>
                  <p className="font-medium">CHF {order.total_amount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;