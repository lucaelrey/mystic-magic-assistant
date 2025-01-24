import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const ActionCardsRules = () => (
  <Card className="glass">
    <CardContent className="pt-6">
      <h2 className="text-2xl font-semibold mb-4">Aktionskarten</h2>
      <div className="space-y-4">
        <p className="mb-4">
          Aktionskarten sind spezielle Karten, die den Spielverlauf beeinflussen und
          strategische Möglichkeiten bieten. Sie können verwendet werden, um:
        </p>
        <ul className="list-disc list-inside pl-4 space-y-2">
          <li>Eigene oder gegnerische Karten anzusehen</li>
          <li>Karten zu tauschen oder neu anzuordnen</li>
          <li>Sich vor den Aktionen anderer Spieler zu schützen</li>
          <li>Das Spielgeschehen zu manipulieren</li>
        </ul>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Wichtige Hinweise:</h3>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>Aktionskarten müssen sofort gespielt werden</li>
            <li>Pro Zug kann nur eine Aktionskarte eingesetzt werden</li>
            <li>Geschützte Spieler sind immun gegen die meisten Aktionskarten</li>
            <li>Aktionskarten kommen nach der Nutzung auf den Ablagestapel</li>
            <li className="text-red-500 font-medium">Alle Aktionskarten zählen 11 Punkte (höchste Punktzahl im Spiel)</li>
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);