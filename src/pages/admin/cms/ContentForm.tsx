import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { ContentKeyField } from "@/components/cms/ContentKeyField";
import { ContentTypeSelect } from "@/components/cms/ContentTypeSelect";
import { TranslationTabs } from "@/components/cms/TranslationTabs";
import { FormHeader } from "@/components/cms/FormHeader";
import { AVAILABLE_LANGUAGES } from "@/config/languages";
import { Content, ContentType } from "@/types/cms";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Translation {
  title: string;
  description: string;
  content: any;
}

const ContentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [key, setKey] = useState("");
  const [type, setType] = useState<ContentType>("page");
  const [published, setPublished] = useState(false);
  const [metadata, setMetadata] = useState<Record<string, any>>({});
  const [translations, setTranslations] = useState<Map<string, Translation>>(
    new Map()
  );

  // Fetch content if editing
  const { data: existingContent, isLoading } = useQuery({
    queryKey: ["cms-content", id],
    queryFn: async () => {
      if (!id) return null;
      
      try {
        const { data, error } = await supabase
          .from("cms_content")
          .select(`*, translations:cms_translations(*)`)
          .eq("id", id)
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error fetching content:", error);
        return null;
      }
    },
    enabled: !!id,
  });

  // Setup form with existing data
  useEffect(() => {
    if (existingContent) {
      setKey(existingContent.key || "");
      setType(existingContent.type as ContentType);
      setPublished(existingContent.published || false);
      setMetadata(existingContent.metadata || {});
      
      // Setup translations
      if (existingContent.translations) {
        const translationsMap = new Map();
        existingContent.translations.forEach((translation: any) => {
          translationsMap.set(translation.language, {
            title: translation.title || "",
            description: translation.description || "",
            content: translation.content || "",
          });
        });
        setTranslations(translationsMap);
      }
    }
  }, [existingContent]);

  // Create mutation
  const createContentMutation = useMutation({
    mutationFn: async () => {
      try {
        // Insert content
        const { data: contentData, error: contentError } = await supabase
          .from("cms_content")
          .insert([{ 
            key, 
            type, 
            published,
            metadata 
          }])
          .select()
          .single();

        if (contentError) throw contentError;

        // Insert translations
        const translationsToInsert = Array.from(translations.entries()).map(([language, translation]) => ({
          content_id: contentData.id,
          language,
          title: translation.title,
          description: translation.description,
          content: translation.content,
        }));

        if (translationsToInsert.length > 0) {
          const { error: translationsError } = await supabase
            .from("cms_translations")
            .insert(translationsToInsert);

          if (translationsError) throw translationsError;
        }

        return contentData;
      } catch (error) {
        console.error("Error creating content:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({ 
        title: "Success", 
        description: "Content was created successfully"
      });
      queryClient.invalidateQueries({ queryKey: ["cms-contents"] });
      navigate("/admin/cms");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: `Failed to create content: ${error.message}`, 
        variant: "destructive" 
      });
    }
  });

  // Update mutation
  const updateContentMutation = useMutation({
    mutationFn: async () => {
      if (!id) throw new Error("No content ID provided");

      try {
        // Update content
        const { error: contentError } = await supabase
          .from("cms_content")
          .update({ key, type, published, metadata })
          .eq("id", id);

        if (contentError) throw contentError;

        // Handle translations
        // First delete existing translations
        const { error: deleteError } = await supabase
          .from("cms_translations")
          .delete()
          .eq("content_id", id);

        if (deleteError) throw deleteError;

        // Then insert new translations
        const translationsToInsert = Array.from(translations.entries()).map(([language, translation]) => ({
          content_id: id,
          language,
          title: translation.title,
          description: translation.description,
          content: translation.content,
        }));

        if (translationsToInsert.length > 0) {
          const { error: translationsError } = await supabase
            .from("cms_translations")
            .insert(translationsToInsert);

          if (translationsError) throw translationsError;
        }
      } catch (error) {
        console.error("Error updating content:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({ 
        title: "Success", 
        description: "Content was updated successfully" 
      });
      queryClient.invalidateQueries({ queryKey: ["cms-contents"] });
      queryClient.invalidateQueries({ queryKey: ["cms-content", id] });
      navigate("/admin/cms");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: `Failed to update content: ${error.message}`, 
        variant: "destructive" 
      });
    }
  });

  const handleSave = async () => {
    if (id) {
      updateContentMutation.mutate();
    } else {
      createContentMutation.mutate();
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="p-6">
          <FormHeader
            title={id ? "Edit Content" : "Create Content"}
            onBack={() => navigate("/admin/cms")}
            onSave={handleSave}
            isSaving={
              createContentMutation.isLoading || updateContentMutation.isLoading
            }
          />

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ContentKeyField value={key} onValueChange={setKey} />
            <ContentTypeSelect value={type} onValueChange={setType} />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <Label htmlFor="published">Veröffentlicht</Label>
            <Switch
              id="published"
              checked={published}
              onCheckedChange={(checked) => setPublished(checked)}
            />
          </div>

          <TranslationTabs
            languages={AVAILABLE_LANGUAGES}
            translations={translations}
            onTranslationsChange={setTranslations}
          />
        </Card>
      </main>
    </div>
  );
};

export default ContentForm;
