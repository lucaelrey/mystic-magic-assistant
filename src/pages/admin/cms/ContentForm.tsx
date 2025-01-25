import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Package, Save, ChevronLeft } from "lucide-react";
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
  const queryClient = useQueryClient();

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
    onSuccess: (data) => {
      if (data) {
        // Transform translations array into object
        const translations = {
          de: data.translations.find((t: any) => t.language === "de") || {
            title: "",
            description: "",
            content: {},
          },
          en: data.translations.find((t: any) => t.language === "en") || {
            title: "",
            description: "",
            content: {},
          },
        };

        // Reset form with loaded data
        form.reset({
          type: data.type,
          key: data.key,
          translations,
        });
      }
    },
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
      queryClient.invalidateQueries({ queryKey: ["cms-contents"] });
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

  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      if (!id) throw new Error("No ID provided for update");

      // Update cms_content
      const { error: contentError } = await supabase
        .from("cms_content")
        .update({
          type: values.type,
          key: values.key,
        })
        .eq("id", id);

      if (contentError) throw contentError;

      // Update translations
      for (const [language, translation] of Object.entries(values.translations)) {
        const { error: translationError } = await supabase
          .from("cms_translations")
          .upsert({
            content_id: id,
            language,
            ...translation as any,
          }, {
            onConflict: 'content_id,language'
          });

        if (translationError) throw translationError;
      }
    },
    onSuccess: () => {
      toast({
        title: "Erfolg",
        description: "Inhalt wurde erfolgreich aktualisiert",
      });
      navigate("/admin/cms");
      queryClient.invalidateQueries({ queryKey: ["cms-contents"] });
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: "Inhalt konnte nicht aktualisiert werden",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  const onSubmit = (values: any) => {
    if (id) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };

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
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">
                {id ? "Inhalt bearbeiten" : "Neuer Inhalt"}
              </h1>
            </div>
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading || createMutation.isPending || updateMutation.isPending}
            >
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