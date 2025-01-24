import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const NumberCardsScoring = () => (
  <Card className="glass">
    <CardContent className="pt-6">
      <h2 className="text-2xl font-semibold mb-4">Zahlenkarten</h2>
      <div className="space-y-4">
        <h3 className="font-semibold mb-2">Werte und Verteilung:</h3>
        <ul className="list-disc list-inside pl-4 space-y-2">
          <li>Die Zahlenkarten haben Werte von 0 bis 10</li>
          <li>Jeder Wert ist mehrfach im Spiel vorhanden</li>
          <li>
            Die Anzahl der Karten variiert je nach Wert:
            <ul className="list-circle list-inside pl-8 space-y-1">
              <li>0: 5 Karten</li>
              <li>1 bis 5: je 10 Karten</li>
              <li>6 bis 9: je 8 Karten</li>
              <li>10: 4 Karten</li>
            </ul>
          </li>
        </ul>
        <h3 className="font-semibold mb-2">Punktewertung:</h3>
        <ul className="list-disc list-inside pl-4 space-y-2">
          <li>Jede Karte zählt ihren aufgedruckten Wert als Minuspunkte</li>
          <li>Das Ziel ist es, möglichst wenig Punkte zu sammeln</li>
        </ul>
      </div>
    </CardContent>
  </Card>
);