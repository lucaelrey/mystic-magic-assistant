import { generalTranslations } from './general';
import { homeTranslations } from './home';
import { shopTranslations } from './shop';
import { rulesTranslations } from './rules';

export const translations = {
  en: {
    ...generalTranslations.en,
    ...homeTranslations.en,
    ...shopTranslations.en,
    ...rulesTranslations.en,
  },
  de: {
    ...generalTranslations.de,
    ...homeTranslations.de,
    ...shopTranslations.de,
    ...rulesTranslations.de,
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export const getTranslation = (lang: Language, key: string): string | string[] => {
  const keys = key.split('.');
  let current: any = translations[lang];
  
  for (const k of keys) {
    if (current[k] === undefined) {
      console.warn(`Translation missing for key: ${key} in language: ${lang}`);
      return key;
    }
    current = current[k];
  }
  
  return current;
};