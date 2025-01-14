import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const RulesOverview = () => (
  <div className="space-y-6">
    <Card className="glass">
      <CardContent className="pt-6">
        <Accordion type="single" defaultValue="general" collapsible>
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
                  <h3 className="font-semibold mb-2">
                    1. Ablagestapelkarte nehmen:
                  </h3>
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
                <div>
                  <h3 className="font-semibold mb-2">
                    2. Nachziehstapelkarte ziehen:
                  </h3>
                  <ul className="list-disc list-inside pl-4">
                    <li>
                      Die oberste Karte des Nachziehstapels ziehen und dann:
                    </li>
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
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  </div>
);