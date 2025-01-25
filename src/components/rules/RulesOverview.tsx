import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { GeneralRules } from "@/components/rules/GeneralRules";
import { GamePreparation } from "@/components/rules/GamePreparation";
import { GameplayRules } from "@/components/rules/GameplayRules";

export const RulesOverview = () => (
  <div className="space-y-6">
    <Card className="glass bg-black/40 backdrop-blur-xl border-white/10">
      <CardContent className="pt-6">
        <Accordion type="single" defaultValue="general" collapsible>
          <GeneralRules />
          <GamePreparation />
          <GameplayRules />
        </Accordion>
      </CardContent>
    </Card>
  </div>
);