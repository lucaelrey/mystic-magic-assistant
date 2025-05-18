
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GamePreparation } from "./GamePreparation";
import { GameplayRules } from "./GameplayRules";
import { GeneralRules } from "./GeneralRules";
import { Loader2 } from "lucide-react";

const RulesOverview = () => {
  const { language, t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <Card className="glass bg-black/40 backdrop-blur-xl border-white/10">
        <CardContent className="pt-6">
          <Accordion type="multiple" className="space-y-4">
            <GeneralRules />
            <GamePreparation />
            <GameplayRules />
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default RulesOverview;
