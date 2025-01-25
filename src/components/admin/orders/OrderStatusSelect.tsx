import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
}

export const OrderStatusSelect = ({ orderId, currentStatus, onStatusChange }: OrderStatusSelectProps) => {
  const { toast } = useToast();

  const handleStatusChange = async (status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      toast({
        title: "Fehler",
        description: "Der Status konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
      return;
    }

    onStatusChange(status);
    toast({
      title: "Erfolg",
      description: "Der Bestellstatus wurde aktualisiert.",
    });
  };

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Status wählen" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Ausstehend</SelectItem>
        <SelectItem value="confirmed">Bestätigt</SelectItem>
        <SelectItem value="shipped">Versendet</SelectItem>
        <SelectItem value="delivered">Geliefert</SelectItem>
        <SelectItem value="cancelled">Storniert</SelectItem>
      </SelectContent>
    </Select>
  );
};