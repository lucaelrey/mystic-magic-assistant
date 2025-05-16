import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/hooks/useContent";

export const GameplayRules = () => {
  const { t } = useLanguage();
  const { translation } = useContent('rule', 'gameplay_rules');
  
  // Early return if translation is not available
  if (!translation?.content) {
    return null;
  }

  const { description, drawCard, takeDiscard, endGame, scoring } = translation.content;
  
  return (
    <AccordionItem value="gameplay">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        {t('rules.overview.gameplay.title')}
      </AccordionTrigger>
      <AccordionContent className="text-left space-y-6">
        {/* Description */}
        <p className="mb-4 whitespace-pre-line">
          {description}
        </p>

        {/* Draw Card Options */}
        {drawCard && (
          <div>
            <h3 className="font-semibold mb-2">
              {drawCard.title}
            </h3>
            <ul className="list-disc list-inside pl-4">
              {drawCard.options?.map((option: string, index: number) => (
                <li key={index} className="mb-1">{option}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Take from Discard Pile */}
        {takeDiscard && (
          <div>
            <h3 className="font-semibold mb-2">
              {takeDiscard.title}
            </h3>
            <ul className="list-disc list-inside pl-4">
              {takeDiscard.rules?.map((rule: string, index: number) => (
                <li key={index} className="mb-1">{rule}</li>
              ))}
            </ul>
          </div>
        )}

        {/* End Game */}
        {endGame && (
          <div>
            <h3 className="font-semibold mb-2">
              {endGame.title}
            </h3>
            <p className="pl-4 whitespace-pre-line">
              {endGame.description}
            </p>
          </div>
        )}

        {/* Scoring */}
        {scoring && (
          <div>
            <h3 className="font-semibold mb-2">
              {scoring.title}
            </h3>
            <p className="pl-4 whitespace-pre-line">
              {scoring.description}
            </p>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};