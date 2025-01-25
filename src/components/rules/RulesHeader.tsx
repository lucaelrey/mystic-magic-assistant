import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const RulesHeader = () => {
  const { language } = useLanguage();
  
  return (
    <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-center">
      {language === 'de' ? 'Spielregeln' : 'Game Rules'}
    </h1>
  );
};