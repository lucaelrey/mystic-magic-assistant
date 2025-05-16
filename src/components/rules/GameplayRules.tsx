
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const GameplayRules = () => {
  const { t } = useLanguage();
  
  const drawCardOptions = t('rules.overview.gameplay.drawCard.options') as string[];
  const takeDiscardRules = t('rules.overview.gameplay.takeDiscard.rules') as string[];
  
  return (
    <AccordionItem value="gameplay">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        {t('rules.overview.gameplay.title')}
      </AccordionTrigger>
      <AccordionContent className="text-left space-y-6">
        {/* Description */}
        <p className="mb-4 whitespace-pre-line">
          {t('rules.overview.gameplay.description')}
        </p>

        {/* Draw Card Options */}
        <div>
          <h3 className="font-semibold mb-2">
            {t('rules.overview.gameplay.drawCard.title')}
          </h3>
          <ul className="list-disc list-inside pl-4">
            {drawCardOptions.map((option: string, index: number) => (
              <li key={index} className="mb-1">{option}</li>
            ))}
          </ul>
        </div>

        {/* Take from Discard Pile */}
        <div>
          <h3 className="font-semibold mb-2">
            {t('rules.overview.gameplay.takeDiscard.title')}
          </h3>
          <ul className="list-disc list-inside pl-4">
            {takeDiscardRules.map((rule: string, index: number) => (
              <li key={index} className="mb-1">{rule}</li>
            ))}
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
