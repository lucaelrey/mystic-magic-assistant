import React from "react";
import { ActionCardsRules } from "./ActionCardsRules";
import { ActionCardGrid } from "./ActionCardGrid";

export const ActionCardsView = () => {
  return (
    <div className="space-y-6">
      <ActionCardsRules />
      <ActionCardGrid />
    </div>
  );
};