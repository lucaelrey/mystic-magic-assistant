
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const NumberCardsScoring = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="glass bg-black/40 backdrop-blur-xl border-white/10">
      <CardContent className="pt-6 text-left">
        <h2 className="text-2xl font-semibold mb-4">{t('rules.numberCards.title')}</h2>
        <div className="space-y-4">
          <h3 className="font-semibold mb-2">{t('rules.numberCards.values')}</h3>
          <ul className="list-disc list-inside pl-4 space-y-2">
            {(t('rules.numberCards.rules') as string[]).map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
          <h3 className="font-semibold mb-2">{t('rules.numberCards.scoring.title')}</h3>
          <ul className="list-disc list-inside pl-4 space-y-2">
            {(t('rules.numberCards.scoring.rules') as string[]).map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
