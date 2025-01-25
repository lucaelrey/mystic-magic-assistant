import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Package, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { ContentTypeSelect } from "@/components/cms/ContentTypeSelect";
import { ContentKeyField } from "@/components/cms/ContentKeyField";
import { TranslationFields } from "@/components/cms/TranslationFields";

const ContentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      type: "action_card",
      key: "",
      translations: {
        de: {
          title: "",
          description: "",
          content: {},
        },
        en: {
          title: "",
          description: "",
          content: {},
        },
      },
    },
  });

  const { data: content, isLoading } = useQuery({
    queryKey: ["cms-content", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("cms_content")
        .select(`
          *,
          translations: cms_translations (*)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      const { data, error } = await supabase
        .from("cms_content")
        .insert([
          {
            type: values.type,
            key: values.key,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      const translations = Object.entries(values.translations).map(
        ([language, translation]: [string, any]) => ({
          content_id: data.id,
          language,
          ...translation,
        })
      );

      const { error: translationError } = await supabase
        .from("cms_translations")
        .insert(translations);

      if (translationError) throw translationError;

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Erfolg",
        description: "Inhalt wurde erfolgreich erstellt",
      });
      navigate("/admin/cms");
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: "Inhalt konnte nicht erstellt werden",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  const onSubmit = (values: any) => {
    createMutation.mutate(values);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">
                {id ? "Inhalt bearbeiten" : "Neuer Inhalt"}
              </h1>
            </div>
            <Button onClick={form.handleSubmit(onSubmit)}>
              <Save className="mr-2 h-4 w-4" />
              Speichern
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-4">Lädt...</div>
          ) : (
            <Form {...form}>
              <div className="space-y-6">
                <ContentTypeSelect form={form} />
                <ContentKeyField form={form} />

                <div className="grid md:grid-cols-2 gap-6">
                  <TranslationFields 
                    form={form} 
                    language="de" 
                    title="Deutsch" 
                  />
                  <TranslationFields 
                    form={form} 
                    language="en" 
                    title="English" 
                  />
                </div>
              </div>
            </Form>
          )}
        </Card>
      </main>
    </div>
  );
};

export default ContentForm;