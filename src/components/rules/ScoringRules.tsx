
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const ScoringRules = () => {
  const { language } = useLanguage();
  
  if (language === "de") {
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
  }
  
  return (
    <AccordionItem value="scoring-rules">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        Scoring
      </AccordionTrigger>
      <AccordionContent className="text-left">
        <div className="space-y-4">
          <p>
            All players reveal their remaining hand cards and add up the card values: The number cards 
            correspond to the printed value (0 to 10). Action cards count as 11 points.
          </p>
          <p>
            The player with the fewest points wins the game and records 0 points. 
            All other players note their points.
          </p>

          <div className="bg-black/20 p-4 rounded-md my-4">
            <p className="font-medium mb-1">Special rule:</p>
            <p>
              If the player who said "Mystic" does not have the fewest points, 
              they receive 5 penalty points in addition to the sum of the points of their hand cards. 
              The player with the lowest score wins the game, but must 
              still count the points of their hand cards.
            </p>
          </div>

          <p>
            Don't feel like counting? Let your assistant do the work: https://play.mysticgame.ch/
          </p>
          <p className="font-medium">
            And now: Shuffle the cards again and on to the next game!
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
