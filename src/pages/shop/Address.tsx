import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useCallback, useRef } from "react";

const addressSchema = z.object({
  firstName: z.string().min(2, "Vorname muss mindestens 2 Zeichen lang sein"),
  lastName: z.string().min(2, "Nachname muss mindestens 2 Zeichen lang sein"),
  street: z.string().min(5, "Straße und Hausnummer müssen angegeben werden"),
  city: z.string().min(2, "Stadt muss angegeben werden"),
  postalCode: z.string().min(5, "PLZ muss 5 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const libraries: ("places")[] = ["places"];

const Address = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCZ4YxH0VgU9qahWzhM1JGWci1h8Y7IZLo",
    libraries,
  });

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      postalCode: "",
      email: "",
    },
  });

  const onPlaceSelected = useCallback(() => {
    const place = autocompleteRef.current?.getPlace();
    
    if (place && place.address_components) {
      let streetNumber = "";
      let route = "";
      let postalCode = "";
      let city = "";

      place.address_components.forEach((component) => {
        const types = component.types;
        
        if (types.includes("street_number")) {
          streetNumber = component.long_name;
        }
        if (types.includes("route")) {
          route = component.long_name;
        }
        if (types.includes("postal_code")) {
          postalCode = component.long_name;
        }
        if (types.includes("locality")) {
          city = component.long_name;
        }
      });

      const fullStreet = `${route} ${streetNumber}`.trim();
      
      form.setValue("street", fullStreet);
      form.setValue("city", city);
      form.setValue("postalCode", postalCode);
    }
  }, [form]);

  const onSubmit = (data: AddressFormValues) => {
    try {
      const cartDataString = localStorage.getItem('cartData');
      if (!cartDataString) {
        toast({
          title: "Fehler",
          description: "Keine Warenkorbdaten gefunden. Bitte fügen Sie Artikel zum Warenkorb hinzu.",
          variant: "destructive",
        });
        navigate("/shop/cart");
        return;
      }

      localStorage.setItem('addressData', JSON.stringify(data));
      
      toast({
        title: "Adresse gespeichert",
        description: "Ihre Lieferadresse wurde erfolgreich gespeichert.",
      });

      navigate("/checkout/payment");
    } catch (error) {
      console.error('Error saving address:', error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Speichern Ihrer Adresse. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="glass-card max-w-2xl mx-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Lieferadresse</h1>
              <MapPin className="w-8 h-8 text-primary" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vorname</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nachname</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Straße und Hausnummer</FormLabel>
                      <FormControl>
                        <Autocomplete
                          onLoad={(autocomplete) => {
                            autocompleteRef.current = autocomplete;
                          }}
                          onPlaceChanged={onPlaceSelected}
                          options={{ 
                            componentRestrictions: { country: "de" },
                            types: ["address"],
                            fields: ["address_components", "formatted_address"]
                          }}
                        >
                          <Input {...field} />
                        </Autocomplete>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PLZ</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stadt</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                    Weiter zur Zahlung
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Address;