import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/hooks/useContent";

export const GamePreparation = () => {
  const { t } = useLanguage();
  const { translation } = useContent('rule', 'preparation_steps');
  
  // Safely access the steps array from the content
  const steps = translation?.content?.steps || [];
  
  return (
    <AccordionItem value="preparation">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        {t('rules.overview.preparation.title')}
      </AccordionTrigger>
      <AccordionContent className="text-left">
        <ol className="list-decimal list-inside space-y-2">
          {steps.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </AccordionContent>
    </AccordionItem>
  );
};