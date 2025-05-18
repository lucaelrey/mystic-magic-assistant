
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { GameOverview } from "./GameOverview";
import { GamePreparation } from "./GamePreparation";
import { GameplayRules } from "./GameplayRules";
import { ScoringRules } from "./ScoringRules";

const RulesOverview = () => {
  return (
    <div className="space-y-6">
      <Card className="glass bg-black/40 backdrop-blur-xl border-white/10">
        <CardContent className="pt-6">
          <Accordion type="multiple" className="space-y-4">
            <GameOverview />
            <GamePreparation />
            <GameplayRules />
            <ScoringRules />
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default RulesOverview;
