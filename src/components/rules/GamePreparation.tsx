
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const GamePreparation = () => {
  const { language } = useLanguage();
  
  // Only German content for now
  if (language !== "de") {
    return null;
  }
  
  return (
    <AccordionItem value="game-preparation">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        Spielvorbereitung
      </AccordionTrigger>
      <AccordionContent className="text-left">
        <div className="space-y-4">
          <ul className="space-y-2 list-disc list-inside pl-2">
            <li>Mische die Spielkarten gründlich durch und teile dir und deinen Mitspieler:innen verdeckt je vier Karten aus.</li>
            <li>Jede:r Spieler:in legt die vier Karten – ohne sie sich anzuschauen – vor sich auf den Tisch. Das sind deine Handkarten.</li>
            <li>Die restlichen Spielkarten kommen verdeckt auf den Ziehstapel.</li>
            <li>Decke die oberste Karte des Ziehstapels auf und lege sie offen auf den Tisch. Das ist die erste Karte des Ablagestapels.</li>
          </ul>
          
          <div className="bg-black/20 p-4 rounded-md my-4">
            <p className="italic">
              Tipp für Zauberlehrlinge & Mystic-Neulinge: Beschwöre deinen persönlichen Mystic-Assistenten unter 
              https://play.mysticgame.ch/ – er hilft dir, die Punkte zu zählen und weiss, welche Kraft in jeder Aktionskarte steckt!
            </p>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
