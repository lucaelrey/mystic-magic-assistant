
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const GameplayRules = () => {
  const { language } = useLanguage();

  if (language === "de") {
    return (
      <AccordionItem value="gameplay-rules">
        <AccordionTrigger className="text-2xl font-semibold text-left">
          Spielablauf
        </AccordionTrigger>
        <AccordionContent className="text-left">
          <div className="space-y-6">
            <p>
              Alle Spieler:innen dürfen zwei ihrer vier verdeckten Karten einmalig anschauen. 
              Danach beginnt die erste Runde: Bestimme selbst, wer zuerst eine Karte ziehen darf und 
              ob ihr die Partie im Uhrzeigersinn oder im Gegenuhrzeigersinn spielen wollt.
            </p>

            <div className="ml-4 mb-6">
              <h4 className="font-medium mb-2">Spieler:in 1:</h4>
              <ol className="list-decimal list-inside space-y-2">
                <li>Nimm eine Karte vom Ziehstapel oder schnapp dir die oberste Karte des Ablagestapels.</li>
                <li>Schau dir die Karte an – aber so, dass deine Mitspieler:innen die Karte nicht sehen können.</li>
                <li>
                  Triff deine Entscheidung:
                  <ul className="list-disc list-inside pl-8 mt-2">
                    <li>Wenn du eine Aktionskarte gezogen hast: Lege sie auf den Ablagestapel und spiele die Aktion.</li>
                    <li>
                      Wenn du eine Zahlenkarte gezogen hast: Du kannst wählen, ob du sie direkt wieder loswerden willst, 
                      indem du sie auf den Ablagestapel legst, oder ob du sie verdeckt zu deinen Handkarten legst. 
                      Wenn du sie zu deinen Handkarten legst, darfst du dafür eine andere deiner Handkarten aufdecken 
                      und offen auf den Ablagestapel legen.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            <h4 className="font-medium mb-2">Und jetzt wird es spannend:</h4>
            <p className="mb-4">
              Handelt es sich um eine Aktionskarte, die du ablegst, gelten einige besondere Regeln – 
              schliesslich kannst du damit die ganze Dynamik des Spiels verändern! Mach dich auf 
              https://mysticgame.ch/rules/action-cards mit den Regeln und der Auswirkungen jeder Aktionskarte 
              vertraut – aber keine Angst – nach wenigen Partien spielst du Aktionskarten bereits wie ein weiser Magier!
            </p>
            <p className="mb-4">
              Legst du hingegen eine Zahlenkarte ab, öffnest du das Spiel für alle anderen: Besitzt jemand die gleiche 
              Zahlenkarte, kann er/sie diese sofort auf den Ablagestapel legen – und zwar ohne abzuwarten, bis er/sie am Zug ist. 
              Ein gewiefter Trick, um lästige Punkte loszuwerden!
            </p>
            
            <p className="mb-4">
              Mit dem Ablegen einer Karte endet der Spielzug von Spieler:in 1. Nun zieht Spieler:in 2 ihre Karte, 
              dann Spieler:in 3 usw., bis die Runde zu Ende ist und die Reihe wieder an Spieler:in 1 geht.
            </p>
            <p className="mb-4">
              Die Partie endet spätestens dann, wenn der/die erste Spieler:in keine Handkarten mehr hat – 
              und so die Partie gewinnt.
            </p>
            <p>
              Du willst nicht so lange warten und bist dir sicher, dass du der/die Spieler:in mit den wenigsten 
              Punkten bist? Dann flüstere »Mystic« und lass deine Spielkameraden erschauern. Alle haben ab jetzt 
              genau noch eine Runde Zeit, möglichst viele Punkte loszuwerden. Dann wird ausgezählt.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }
  
  return (
    <AccordionItem value="gameplay-rules">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        Gameplay
      </AccordionTrigger>
      <AccordionContent className="text-left">
        <div className="space-y-6">
          <p>
            All players are allowed to look at two of their four face-down cards once. 
            Then the first round begins: Decide for yourselves who gets to draw a card first and 
            whether you want to play clockwise or counterclockwise.
          </p>

          <div className="ml-4 mb-6">
            <h4 className="font-medium mb-2">Player 1:</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>Take a card from the draw pile or grab the top card from the discard pile.</li>
              <li>Look at the card – but in a way that your fellow players cannot see the card.</li>
              <li>
                Make your decision:
                <ul className="list-disc list-inside pl-8 mt-2">
                  <li>If you've drawn an action card: Place it on the discard pile and play the action.</li>
                  <li>
                    If you've drawn a number card: You can choose whether you want to get rid of it directly 
                    by placing it on the discard pile, or whether you want to place it face down with your hand cards. 
                    If you add it to your hand cards, you may reveal another of your hand cards 
                    and place it face up on the discard pile.
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          <h4 className="font-medium mb-2">And now it gets exciting:</h4>
          <p className="mb-4">
            If it's an action card that you discard, there are some special rules – 
            after all, you can change the whole dynamic of the game with it! Familiarize yourself with 
            the rules and effects of each action card at https://mysticgame.ch/rules/action-cards 
            – but don't worry – after a few games, you'll already be playing action cards like a wise magician!
          </p>
          <p className="mb-4">
            If you discard a number card, however, you open up the game for everyone else: If someone has the same 
            number card, they can immediately place it on the discard pile – without waiting until it's their turn. 
            A clever trick to get rid of annoying points!
          </p>
            
          <p className="mb-4">
            Player 1's turn ends with the discarding of a card. Now Player 2 draws their card, 
            then Player 3, and so on, until the round is over and it's Player 1's turn again.
          </p>
          <p className="mb-4">
            The game ends at the latest when the first player has no more hand cards – 
            and thus wins the game.
          </p>
          <p>
            Don't want to wait that long and are sure that you're the player with the fewest 
            points? Then whisper "Mystic" and make your fellow players shiver. From now on, everyone has 
            exactly one more round to get rid of as many points as possible. Then the points are counted.
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
