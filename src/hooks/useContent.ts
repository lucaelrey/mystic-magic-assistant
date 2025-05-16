
// This is now a mock hook that returns empty data
// since we're no longer using Supabase for content
import { ContentType } from "@/types/cms";

export const useContent = (type: ContentType, key?: string) => {
  return {
    contents: [],
    translations: [],
    content: null,
    translation: null,
    isLoading: false,
    error: null
  };
};
