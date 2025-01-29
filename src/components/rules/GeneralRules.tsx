import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/hooks/useContent";

export const GeneralRules = () => {
  const { t } = useLanguage();
  const { translation } = useContent('rule', 'general_rules');
  
  // Early return if translation is not available
  if (!translation?.content) {
    return null;
  }

  const { description } = translation.content;
  
  return (
    <AccordionItem value="general">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        {t('rules.overview.general.title')}
      </AccordionTrigger>
      <AccordionContent className="text-left">
        <p className="mb-4 whitespace-pre-line">
          {description}
        </p>
      </AccordionContent>
    </AccordionItem>
  );
};