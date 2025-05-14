import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Content, ContentType, Language } from "@/types/cms";
import { useLanguage } from "@/contexts/LanguageContext";

export const useContent = (type: ContentType, key?: string) => {
  const { language } = useLanguage();

  const fetchContent = async () => {
    let query = supabase.from('cms_content');
    
    // Base query to select all columns
    let baseQuery = query.select(`
      *,
      translations:cms_translations(*)
    `);
    
    // Filter by type
    baseQuery = baseQuery.eq('type', type);
    
    // If a key is provided, filter by that key
    if (key) {
      baseQuery = baseQuery.eq('key', key);
    }

    try {
      const { data, error } = await baseQuery;

      if (error) {
        throw error;
      }

      // Transform the data to the right format
      return data?.map((item: any) => ({
        ...item,
        translations: item.translations || [],
      })) as Content[] || [];
    } catch (error) {
      console.error("Error fetching content:", error);
      return [] as Content[];
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['content', type, key],
    queryFn: fetchContent,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  // Helper function to find the translation in the current language
  const getTranslation = (content: Content) => {
    return content.translations.find(t => t.language === language);
  };

  // If a single key was requested, return just that one
  if (key && data && data.length > 0) {
    const content = data[0];
    return {
      content: content || null,
      translation: content ? getTranslation(content) : null,
      isLoading,
      error,
    };
  }

  // Otherwise return all content with their translations
  return {
    contents: data || [],
    translations: data?.map(content => getTranslation(content)) || [],
    isLoading,
    error,
  };
};
