import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/hooks/useContent";

export const GameplayRules = () => {
  const { t } = useLanguage();
  const { translation } = useContent('rule', 'gameplay_rules');
  
  if (!translation?.content) {
    return null;
  }

  const { drawCard, takeDiscard, endGame, scoring } = translation.content;
  
  return (
    <AccordionItem value="gameplay">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        {translation.title}
      </AccordionTrigger>
      <AccordionContent className="text-left space-y-6">
        <p className="mb-4">
          {translation.content.description}
        </p>

        {/* Draw Card Options */}
        <div>
          <h3 className="font-semibold mb-2">
            {drawCard.title}
          </h3>
          <ul className="list-disc list-inside pl-4">
            {drawCard.options.map((option: string, index: number) => (
              <li key={index} className="mb-1">{option}</li>
            ))}
          </ul>
        </div>

        {/* Take from Discard Pile */}
        <div>
          <h3 className="font-semibold mb-2">
            {takeDiscard.title}
          </h3>
          <ul className="list-disc list-inside pl-4">
            {takeDiscard.rules.map((rule: string, index: number) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* End Game */}
        <div>
          <h3 className="font-semibold mb-2">
            {endGame.title}
          </h3>
          <p className="pl-4 whitespace-pre-line">
            {endGame.description}
          </p>
        </div>

        {/* Scoring */}
        <div>
          <h3 className="font-semibold mb-2">
            {scoring.title}
          </h3>
          <p className="pl-4 whitespace-pre-line">
            {scoring.description}
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};