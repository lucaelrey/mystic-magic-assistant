
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Save, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/cms/RichTextEditor";

type EmailTemplateType = "order_confirmation" | "shipping_confirmation" | "custom";

interface EmailTemplateFormData {
  name: string;
  type: EmailTemplateType;
  subject: string;
  html_content: string;
  variables?: Record<string, any>;
}

const EmailTemplateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<EmailTemplateFormData>({
    defaultValues: {
      name: "",
      type: "order_confirmation",
      subject: "",
      html_content: "",
    },
  });

  const { data: template, isLoading } = useQuery({
    queryKey: ["email-template", id],
    queryFn: async () => {
      if (!id) return null;
      
      try {
        console.log("Fetching template with ID:", id);
        const { data, error } = await supabase
          .from("email_templates")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching template:", error);
          throw error;
        }
        
        console.log("Fetched template data:", data);
        return data;
      } catch (error) {
        console.error("Error in template fetch:", error);
        return null;
      }
    },
    enabled: !!id,
  });

  React.useEffect(() => {
    if (template) {
      console.log("Setting form values with template:", template);
      form.reset({
        name: template.name,
        type: template.type as EmailTemplateType,
        subject: template.subject,
        html_content: template.html_content,
        variables: template.variables as Record<string, any>,
      });
      console.log("Current form values after reset:", form.getValues());
    }
  }, [template, form]);

  const createMutation = useMutation({
    mutationFn: async (values: EmailTemplateFormData) => {
      try {
        const { data, error } = await supabase
          .from("email_templates")
          .insert([values])
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error creating template:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-templates"] });
      toast({
        title: "Erfolg",
        description: "E-Mail-Vorlage wurde erstellt",
      });
      navigate("/admin/email-templates");
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "E-Mail-Vorlage konnte nicht erstellt werden",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: EmailTemplateFormData) => {
      if (!id) throw new Error("No ID provided");
      
      try {
        const { error } = await supabase
          .from("email_templates")
          .update(values)
          .eq("id", id);

        if (error) throw error;
      } catch (error) {
        console.error("Error updating template:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-templates"] });
      queryClient.invalidateQueries({ queryKey: ["email-template", id] });
      toast({
        title: "Erfolg",
        description: "E-Mail-Vorlage wurde aktualisiert",
      });
      navigate("/admin/email-templates");
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "E-Mail-Vorlage konnte nicht aktualisiert werden",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: EmailTemplateFormData) => {
    console.log("Submitting form with values:", values);
    if (id) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/admin/email-templates")}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">
                {id ? "E-Mail-Vorlage bearbeiten" : "Neue E-Mail-Vorlage"}
              </h1>
            </div>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              Speichern
            </Button>
          </div>

          <Form {...form}>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Typ</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Wähle einen Typ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="order_confirmation">
                            Bestellbestätigung
                          </SelectItem>
                          <SelectItem value="shipping_confirmation">
                            Versandbestätigung
                          </SelectItem>
                          <SelectItem value="custom">
                            Benutzerdefiniert
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Betreff</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="html_content"
                render={({ field }) => {
                  console.log("RichTextEditor field value:", field.value);
                  return (
                    <FormItem>
                      <FormLabel>Inhalt</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default EmailTemplateForm;
