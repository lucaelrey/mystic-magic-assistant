import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const paymentSchema = z.object({
  paymentMethod: z.string().min(1, "Bitte wählen Sie eine Zahlungsmethode"),
  cardNumber: z.string().min(16, "Ungültige Kartennummer"),
  expiryDate: z.string().min(5, "Ungültiges Ablaufdatum"),
  cvv: z.string().min(3, "Ungültiger CVV-Code"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      // Update order status to confirmed
      const { error } = await supabase
        .from('orders')
        .update({ status: 'confirmed' })
        .eq('status', 'pending')
        .single();

      if (error) throw error;

      toast({
        title: "Bestellung erfolgreich",
        description: "Ihre Bestellung wurde erfolgreich aufgegeben.",
      });

      navigate("/checkout/confirmation");
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem bei der Verarbeitung Ihrer Zahlung. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="glass-card max-w-2xl mx-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Zahlung</h1>
              <CreditCard className="w-8 h-8 text-primary" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zahlungsmethode</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Wähle eine Zahlungsmethode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="card">Kreditkarte</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="klarna">Klarna</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kartennummer</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="1234 5678 9012 3456" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gültig bis</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="MM/YY" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" maxLength={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <div className="mb-4 p-4 bg-white/5 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>Zwischensumme</span>
                      <span>29.99 €</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Versand</span>
                      <span>Kostenlos</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Gesamt</span>
                      <span>29.99 €</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(-1)}
                    >
                      Zurück
                    </Button>
                    <Button type="submit" className="w-full">
                      Jetzt kaufen
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Payment;