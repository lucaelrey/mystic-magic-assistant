
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const GameOverview = () => {
  const { language } = useLanguage();
  
  // Only German content for now
  if (language !== "de") {
    return null;
  }
  
  return (
    <AccordionItem value="game-overview">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        Mystic in Kürze
      </AccordionTrigger>
      <AccordionContent className="text-left">
        <div className="space-y-4">
          <p>
            Das Wichtigste zuerst: Wer am Ende einer Partie am wenigsten Punkte gesammelt hat, gewinnt!
          </p>
          <p>
            Eine Partie besteht aus mehreren Runden. In jeder Runde ziehen die Spieler:innen eine neue Karte, 
            versuchen, unerwünschte Karten mit hohen Punkten loszuwerden oder das Spielgeschehen mit Aktionskarten 
            auf den Kopf zu stellen.
          </p>
          <p>
            Das Geheimnis: Einige deiner Karten liegen verdeckt vor dir, sodass du ihre Punktewerte und die 
            geheimen Kräfte deiner Aktionskarten nicht kennst!
          </p>
          <p>
            Geschick, strategisches Denken, schnelle Reaktionen und ein gutes Gedächtnis sind gefragt. 
            Denn du sabotierst deine Gegner:innen am effektivsten, wenn du deine mystische Gabe dazu nutzt, 
            zu durchschauen, wer auf welchen verdeckten Karten sitzt.
          </p>
          <p>
            Und vergiss nicht: Wenn du oder eine:r deiner Mitspieler:innen »Mystic« flüstert, ist die Partie vorbei 
            – und gewonnen hat, wer die wenigsten Punkte hat.
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
