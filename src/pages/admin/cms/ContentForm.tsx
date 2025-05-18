import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { FormHeader } from "@/components/cms/FormHeader";
import { FormContent } from "@/components/cms/FormContent";

const ContentForm = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
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
  });

  // Effect to update form when content is loaded
  React.useEffect(() => {
    if (content) {
      const translations = {
        de: content.translations.find((t: any) => t.language === "de") || {
          title: "",
          description: "",
          content: {},
        },
        en: content.translations.find((t: any) => t.language === "en") || {
          title: "",
          description: "",
          content: {},
        },
      };

      form.reset({
        type: content.type,
        key: content.key,
        translations,
      });
    }
  }, [content, form]);

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      // Insert new content
      const { data: contentData, error: contentError } = await supabase
        .from("cms_content")
        .insert([
          {
            type: values.type,
            key: values.key,
          },
        ])
        .select()
        .single();

      if (contentError) throw contentError;

      // Insert translations
      const translations = Object.entries(values.translations).map(
        ([language, translation]: [string, any]) => ({
          content_id: contentData.id,
          language,
          ...translation,
        })
      );

      const { error: translationError } = await supabase
        .from("cms_translations")
        .insert(translations);

      if (translationError) throw translationError;

      return contentData;
    },
    onSuccess: (data) => {
      toast({
        title: "Erfolg",
        description: "Inhalt wurde erfolgreich erstellt",
      });
      queryClient.invalidateQueries({ queryKey: ["cms-contents"] });
      navigate(`/admin/cms/${data.id}`);
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

      // Update content
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
          .upsert(
            {
              content_id: id,
              language,
              ...translation as any,
            },
            {
              onConflict: "content_id,language",
            }
          );

        if (translationError) throw translationError;
      }
    },
    onSuccess: () => {
      toast({
        title: "Erfolg",
        description: "Inhalt wurde erfolgreich aktualisiert",
      });
      queryClient.invalidateQueries({ queryKey: ["cms-contents"] });
      queryClient.invalidateQueries({ queryKey: ["cms-content", id] });
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
          <FormHeader 
            id={id}
            isLoading={isLoading}
            isPending={createMutation.isPending || updateMutation.isPending}
            onSubmit={form.handleSubmit(onSubmit)}
          />
          <FormContent 
            form={form}
            isLoading={isLoading}
          />
        </Card>
      </main>
    </div>
  );
};

export default ContentForm;