import React from "react";
import { ActionCardsRules } from "./ActionCardsRules";
import { ActionCardGrid } from "./ActionCardGrid";

const ActionCardsView = () => {
  return (
    <div className="space-y-6">
      <ActionCardsRules />
      <ActionCardGrid />
    </div>
  );
};

export default ActionCardsView;