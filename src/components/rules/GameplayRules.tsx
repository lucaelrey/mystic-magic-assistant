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

  const { drawCard, takeDiscard, callMystic, throwIn, finalScoring, nextRound } = translation.content;
  
  return (
    <AccordionItem value="gameplay">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        {translation.title}
      </AccordionTrigger>
      <AccordionContent className="text-left space-y-6">
        <p className="mb-4">
          {translation.content.description}
        </p>

        {/* Draw Card Option */}
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

        {/* Call Mystic */}
        <div>
          <h3 className="font-semibold mb-2">
            {callMystic.title}
          </h3>
          <p className="pl-4">
            {callMystic.description}
          </p>
        </div>

        {/* Throw In */}
        <div>
          <h3 className="font-semibold mb-2">
            {throwIn.title}
          </h3>
          <p className="pl-4">
            {throwIn.description}
          </p>
        </div>

        {/* Final Scoring */}
        <div>
          <h3 className="font-semibold mb-2">
            {finalScoring.title}
          </h3>
          <div className="pl-4 space-y-2">
            <p>{finalScoring.description}</p>
            <p>{finalScoring.mysticPenalty}</p>
          </div>
        </div>

        {/* Next Round */}
        <div>
          <h3 className="font-semibold mb-2">
            {nextRound.title}
          </h3>
          <p className="pl-4">
            {nextRound.description}
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};