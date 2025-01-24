import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const GameplayRules = () => {
  const { t } = useLanguage();
  
  return (
    <AccordionItem value="gameplay">
      <AccordionTrigger className="text-2xl font-semibold">
        {t('rules.overview.gameplay.title')}
      </AccordionTrigger>
      <AccordionContent>
        <p className="mb-4">
          {t('rules.overview.gameplay.description')}
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">
              {t('rules.overview.gameplay.drawCard.title')}
            </h3>
            <ul className="list-disc list-inside pl-4">
              <li>{t('rules.overview.gameplay.description')}</li>
              <ul className="list-circle list-inside pl-8 space-y-1">
                {t('rules.overview.gameplay.drawCard.options').map((option: string, index: number) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">
              {t('rules.overview.gameplay.takeDiscard.title')}
            </h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              {t('rules.overview.gameplay.takeDiscard.rules').map((rule: string, index: number) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};