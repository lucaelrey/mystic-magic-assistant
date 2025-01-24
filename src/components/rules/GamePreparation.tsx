import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const GamePreparation = () => (
  <AccordionItem value="preparation">
    <AccordionTrigger className="text-2xl font-semibold">
      Spielvorbereitung
    </AccordionTrigger>
    <AccordionContent>
      <ol className="list-decimal list-inside space-y-2">
        <li>
          Jeder Spieler erhält je nach Spielmodus vier, fünf oder sechs
          Karten und legt sie unangesehen und verdeckt nebeneinander vor
          sich auf den Tisch (eigene Auslage).
        </li>
        <li>
          Der Rest der Karten kommt verdeckt als Nachziehstapel in die
          Mitte des Tisches.
        </li>
        <li>
          Eine Karte wird vom Nachziehstapel gezogen und aufgedeckt neben
          den Nachziehstapel gelegt: Sie markiert den Anfang des
          Ablagestapels.
        </li>
        <li>
          Jeder Spieler darf sich einmalig zwei seiner vor ihm
          ausliegenden Karten ansehen.
        </li>
        <li>Ein Startspieler wird bestimmt und das Spiel beginnt.</li>
      </ol>
    </AccordionContent>
  </AccordionItem>
);