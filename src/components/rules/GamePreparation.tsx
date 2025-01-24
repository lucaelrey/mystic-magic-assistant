import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const GamePreparation = () => {
  const { t } = useLanguage();
  
  return (
    <AccordionItem value="preparation">
      <AccordionTrigger className="text-2xl font-semibold">
        {t('rules.overview.preparation.title')}
      </AccordionTrigger>
      <AccordionContent>
        <ol className="list-decimal list-inside space-y-2">
          {(t('rules.overview.preparation.steps') as string[]).map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </AccordionContent>
    </AccordionItem>
  );
};