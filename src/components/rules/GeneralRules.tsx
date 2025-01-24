import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const GeneralRules = () => (
  <AccordionItem value="general">
    <AccordionTrigger className="text-2xl font-semibold">
      Allgemeine Regeln
    </AccordionTrigger>
    <AccordionContent>
      <p className="mb-4">
        Das Ziel ist es, am Ende des Spiels die wenigsten Punkte auf der
        Hand zu haben, indem man strategisch Karten austauscht und
        besondere Aktionskarten nutzt. Jeder Spieler hat teilweise
        verdeckte Karten, deren Werte er nur begrenzt kennt.
      </p>
    </AccordionContent>
  </AccordionItem>
);