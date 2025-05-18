
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const DetailedCardRules = () => {
  const { language } = useLanguage();
  
  // Only display this component for German language
  if (language !== "de") {
    return null;
  }
  
  return (
    <AccordionItem value="detailed-rules">
      <AccordionTrigger className="text-2xl font-semibold text-left">
        Ausführliche Spielregeln
      </AccordionTrigger>
      <AccordionContent className="text-left space-y-6">
        <div className="space-y-6">
          {/* Mystic in Kürze */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Mystic in Kürze</h3>
            <p className="mb-4">
              Das Wichtigste zuerst: Wer am Ende einer Partie am wenigsten Punkte gesammelt hat, gewinnt!
            </p>
            <p className="mb-4">
              Eine Partie besteht aus mehreren Runden. In jeder Runde ziehen die Spieler:innen eine neue Karte, 
              versuchen, unerwünschte Karten mit hohen Punkten loszuwerden oder das Spielgeschehen mit Aktionskarten 
              auf den Kopf zu stellen.
            </p>
            <p className="mb-4">
              Das Geheimnis: Einige deiner Karten liegen verdeckt vor dir, sodass du ihre Punktewerte und die 
              geheimen Kräfte deiner Aktionskarten nicht kennst!
            </p>
            <p className="mb-4">
              Geschick, strategisches Denken, schnelle Reaktionen und ein gutes Gedächtnis sind gefragt. 
              Denn du sabotierst deine Gegner:innen am effektivsten, wenn du deine mystische Gabe dazu nutzt, 
              zu durchschauen, wer auf welchen verdeckten Karten sitzt.
            </p>
            <p>
              Und vergiss nicht: Wenn du oder eine:r deiner Mitspieler:innen »Mystic« flüstert, ist die Partie vorbei 
              – und gewonnen hat, wer die wenigsten Punkte hat.
            </p>
          </section>

          {/* Spielvorbereitung */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Spielvorbereitung</h3>
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
          </section>

          {/* Spielablauf */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Spielablauf</h3>
            <p className="mb-4">
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
            <p className="mb-4 font-medium">
              Wichtig: Pro Zug darfst du immer nur eine Zahlenkarte ablegen – auch wenn du mehrere identische 
              Zahlenkarten in den Handkarten hältst.
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
          </section>

          {/* Punktezählung */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Punktezählung</h3>
            <p className="mb-4">
              Alle Spieler:innen decken ihre verbliebenen Handkarten auf und addieren die Kartenwerte: Die Zahlenkarten 
              entsprechen dem aufgedruckten Wert (0 bis 10). Aktionskarten zählen 11 Punkte.
            </p>
            <p className="mb-4">
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

            <p className="mb-4">
              Keine Lust zu zählen? Überlass die Arbeit eurem Assistenten: https://play.mysticgame.ch/
            </p>

            <p className="font-medium">
              Und nun: Karten neu mischen und auf zur nächsten Partie!
            </p>
          </section>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
