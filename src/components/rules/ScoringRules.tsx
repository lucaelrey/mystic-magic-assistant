
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const ScoringRules = () => {
  const { language } = useLanguage();
  
  // Only German content for now
  if (language !== "de") {
    return null;
  }
  
  return (
    <AccordionItem value="scoring-rules">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        Punktezählung
      </AccordionTrigger>
      <AccordionContent className="text-left">
        <div className="space-y-4">
          <p>
            Alle Spieler:innen decken ihre verbliebenen Handkarten auf und addieren die Kartenwerte: Die Zahlenkarten 
            entsprechen dem aufgedruckten Wert (0 bis 10). Aktionskarten zählen 11 Punkte.
          </p>
          <p>
            Der/die Spieler:in mit den wenigsten Punkten gewinnt die Partie und verbucht 0 Punkte. 
            Alle anderen Spieler notieren sich ihre Punkte.
          </p>

          <div className="bg-black/20 p-4 rounded-md my-4">
            <p className="font-medium mb-1">Sonderregel:</p>
            <p>
              Wenn die:r Spieler:in, die »Mystic« gesagt hat, nicht die wenigsten Punkte hat, 
              bekommt er/sie 5 Strafpunkte zusätzlich zur Summe der Punkte seiner/ihrer Handkarten. 
              Der/die Spieler:in mit der tiefsten Punktzahl gewinnt die Partie, muss jedoch 
              trotzdem die Punkte der Handkarten zählen.
            </p>
          </div>

          <p>
            Keine Lust zu zählen? Überlass die Arbeit eurem Assistenten: https://play.mysticgame.ch/
          </p>
          <p className="font-medium">
            Und nun: Karten neu mischen und auf zur nächsten Partie!
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
