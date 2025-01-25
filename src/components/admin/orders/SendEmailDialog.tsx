import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SendEmailDialogProps {
  order: any;
}

export const SendEmailDialog = ({ order }: SendEmailDialogProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { data: templates, isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['email-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  const handleSendEmail = async () => {
    if (!selectedTemplate) {
      toast({
        title: "Fehler",
        description: "Bitte wähle eine E-Mail-Vorlage aus.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const selectedTemplateData = templates?.find(t => t.id === selectedTemplate);
      if (!selectedTemplateData) throw new Error("Template nicht gefunden");

      const { data: emailResponse, error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          type: selectedTemplateData.type,
          orderData: {
            orderNumber: order.id.slice(0, 8),
            totalAmount: order.total_amount,
            shippingAddress: order.shipping_address,
            items: order.order_items,
          },
        },
      });

      if (emailError) throw emailError;

      toast({
        title: "Erfolg",
        description: "Die E-Mail wurde erfolgreich versendet.",
      });
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: "Die E-Mail konnte nicht versendet werden.",
        variant: "destructive",
      });
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2">
          <Mail className="h-4 w-4 mr-2" />
          E-Mail senden
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>E-Mail senden</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">E-Mail-Vorlage</label>
            <Select
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
              disabled={isLoadingTemplates}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wähle eine Vorlage" />
              </SelectTrigger>
              <SelectContent>
                {templates?.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleSendEmail} 
            disabled={isLoading || !selectedTemplate}
            className="w-full"
          >
            {isLoading ? "Wird gesendet..." : "E-Mail senden"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};