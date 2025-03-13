
import { Content, ContentType, Language } from "@/types/cms";
import { useLanguage } from "@/contexts/LanguageContext";

// This is a mock implementation that no longer relies on Supabase
export const useContent = (type: ContentType, key?: string) => {
  const { language } = useLanguage();
  
  // Return empty data since we're moving to hardcoded content
  return {
    content: null,
    translation: null,
    contents: [],
    translations: [],
    isLoading: false,
    error: null,
  };
};
