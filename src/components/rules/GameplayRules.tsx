import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const GameplayRules = () => (
  <AccordionItem value="gameplay">
    <AccordionTrigger className="text-2xl font-semibold">
      Spielverlauf
    </AccordionTrigger>
    <AccordionContent>
      <p className="mb-4">
        Gespielt wird nacheinander im Uhrzeigersinn. Wenn ein Spieler an
        der Reihe ist, kann er eine der folgenden Optionen wählen:
      </p>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">1. Nachziehstapelkarte ziehen:</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Die oberste Karte des Nachziehstapels ziehen und dann:</li>
            <ul className="list-circle list-inside pl-8 space-y-1">
              <li>direkt auf den Ablagestapel werfen oder</li>
              <li>mit einer Karte der eigenen Auslage ersetzen oder</li>
              <li>
                wenn es sich um eine Aktionskarte handelt, die Aktion
                ausführen
              </li>
            </ul>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">2. Ablagestapelkarte nehmen:</h3>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>
              Die oberste Karte des Ablagestapels nehmen und durch eine
              Karte der eigenen Auslage ersetzen.
            </li>
            <li>
              Hat ein Spieler eine identische Karte wie die gerade auf den
              Ablagestapel gelegte, kann er bis zu zwei dieser Karten
              direkt auf den Ablagestapel werfen.
            </li>
          </ul>
        </div>
      </div>
    </AccordionContent>
  </AccordionItem>
);