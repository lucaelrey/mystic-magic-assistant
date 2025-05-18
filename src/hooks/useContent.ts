
import { ContentType } from "@/types/cms";
import { useLanguage } from "@/contexts/LanguageContext";
import { rulesTranslations } from "@/i18n/translations/rules";

// Hardcoded content data to replace Supabase content
const contentData = {
  rule: {
    number_cards_rules: {
      en: {
        title: "Number Cards",
        content: {
          values: "Values and Distribution:",
          rules: [
            "Number cards have values from 0 to 10",
            "Each value appears multiple times in the game"
          ],
          scoring: {
            title: "Scoring:",
            rules: [
              "Each card counts its printed value as points",
              "The goal is to collect as few points as possible"
            ]
          }
        }
      },
      de: {
        title: "Zahlenkarten",
        content: {
          values: "Werte und Verteilung:",
          rules: [
            "Die Zahlenkarten haben Werte von 0 bis 10",
            "Jeder Wert ist mehrfach im Spiel vorhanden"
          ],
          scoring: {
            title: "Punktewertung:",
            rules: [
              "Jede Karte zählt ihren aufgedruckten Wert als Punkte",
              "Das Ziel ist es, möglichst wenig Punkte zu sammeln"
            ]
          }
        }
      }
    }
  }
};

export const useContent = (type: ContentType, key?: string) => {
  const { language } = useLanguage();
  
  // Simulate a data fetch with hardcoded data
  const getContent = () => {
    if (!key || !type) {
      return null;
    }
    
    // Check if we have this content in our hardcoded data
    if (contentData[type] && contentData[type][key]) {
      const content = contentData[type][key];
      
      // Return the content for the current language
      if (content[language]) {
        return content[language];
      }
      
      // Fallback to English if the requested language is not available
      if (content.en) {
        return content.en;
      }
    }
    
    return null;
  };
  
  // Return the same structure as the original hook for compatibility
  return {
    contents: [],
    translations: [],
    content: null,
    translation: getContent(),
    isLoading: false,
    error: null
  };
};
