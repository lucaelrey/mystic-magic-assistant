import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const GeneralRules = () => {
  const { t } = useLanguage();
  
  return (
    <AccordionItem value="general">
      <AccordionTrigger className="text-2xl font-semibold">
        {t('rules.overview.general.title')}
      </AccordionTrigger>
      <AccordionContent>
        <p className="mb-4">
          {t('rules.overview.general.description')}
        </p>
      </AccordionContent>
    </AccordionItem>
  );
};