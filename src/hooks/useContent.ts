import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Content, ContentType, Language } from "@/types/cms";
import { useLanguage } from "@/contexts/LanguageContext";

export const useContent = (type: ContentType, key?: string) => {
  const { language } = useLanguage();

  const fetchContent = async () => {
    // Basis-Query für cms_content
    let query = supabase
      .from('cms_content')
      .select(`
        *,
        translations:cms_translations(*)
      `)
      .eq('type', type)
      .eq('published', true);

    // Wenn ein Key angegeben ist, nur diesen spezifischen Inhalt laden
    if (key) {
      query = query.eq('key', key);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Transformiere die Daten in das richtige Format
    return data.map((item: any) => ({
      ...item,
      translations: item.translations || [],
    })) as Content[];
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['content', type, key],
    queryFn: fetchContent,
    staleTime: 1000 * 60 * 5, // 5 Minuten Cache
  });

  // Hilfsfunktion um die Übersetzung in der aktuellen Sprache zu finden
  const getTranslation = (content: Content) => {
    return content.translations.find(t => t.language === language);
  };

  // Wenn ein einzelner Key angefordert wurde, geben wir nur diesen zurück
  if (key && data) {
    const content = data[0];
    return {
      content: content || null,
      translation: content ? getTranslation(content) : null,
      isLoading,
      error,
    };
  }

  // Ansonsten geben wir alle Inhalte mit ihren Übersetzungen zurück
  return {
    contents: data || [],
    translations: data?.map(content => getTranslation(content)) || [],
    isLoading,
    error,
  };
};