import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const ActionCardsRules = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="glass bg-black/40 backdrop-blur-xl border-white/10">
      <CardContent className="pt-6 text-left">
        <h2 className="text-2xl font-semibold mb-4">{t('rules.actionCards.title')}</h2>
        <div className="space-y-4">
          <p className="mb-4">
            {t('rules.actionCards.description')}
          </p>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">{t('rules.actionCards.important.title')}</h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              {(t('rules.actionCards.important.rules') as string[]).map((rule: string, index: number) => (
                <li key={index} className={index === 4 ? "text-[#e2c361] font-medium" : ""}>
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