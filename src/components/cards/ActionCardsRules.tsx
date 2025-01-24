import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const ActionCardsRules = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="glass">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4">{t('rules.actionCards.title')}</h2>
        <div className="space-y-4">
          <p className="mb-4">
            {t('rules.actionCards.description')}
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            {(t('rules.actionCards.uses') as string[]).map((use: string, index: number) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">{t('rules.actionCards.important.title')}</h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              {(t('rules.actionCards.important.rules') as string[]).map((rule: string, index: number) => (
                <li key={index} className={index === 4 ? "text-red-500 font-medium" : ""}>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};