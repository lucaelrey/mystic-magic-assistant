
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const GameOverview = () => {
  const { language } = useLanguage();
  
  if (language === "de") {
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
  }
  
  return (
    <AccordionItem value="game-overview">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        Game Overview
      </AccordionTrigger>
      <AccordionContent className="text-left">
        <div className="space-y-4">
          <p>
            The most important thing first: Whoever has collected the fewest points at the end of a game wins!
          </p>
          <p>
            A game consists of several rounds. In each round, players draw a new card, 
            try to get rid of unwanted cards with high points, or turn the game upside down with action cards.
          </p>
          <p>
            The secret: Some of your cards lie face down in front of you, so you don't know their point values and the 
            hidden powers of your action cards!
          </p>
          <p>
            Skill, strategic thinking, quick reactions, and a good memory are required. 
            You sabotage your opponents most effectively when you use your mystical gift to see through 
            who is sitting on which hidden cards.
          </p>
          <p>
            And don't forget: If you or one of your fellow players whispers "Mystic", the game is over 
            - and whoever has the fewest points wins.
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
