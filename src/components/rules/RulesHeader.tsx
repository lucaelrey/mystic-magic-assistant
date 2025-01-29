import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const RulesHeader = () => {
  const { t } = useLanguage();
  
  return (
    <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-center">
      {t('rules.title')}
    </h1>
  );
};