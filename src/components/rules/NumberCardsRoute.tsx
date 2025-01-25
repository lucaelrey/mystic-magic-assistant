import React from "react";
import { NumberCardsScoring } from "@/components/rules/NumberCardsScoring";
import { NumberCardsView } from "@/components/cards/NumberCardsView";
import { numberCards } from "@/data/numberCards";

export const NumberCardsRoute = () => {
  return (
    <div className="space-y-6">
      <NumberCardsScoring />
      <NumberCardsView cards={numberCards} />
    </div>
  );
};