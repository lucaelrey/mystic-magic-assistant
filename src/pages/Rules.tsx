import { Navigation } from "@/components/Navigation";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Rules = () => {
  const [openSection, setOpenSection] = useState<string | null>("overview");

  const RuleSection = ({ 
    id, 
    title, 
    children 
  }: { 
    id: string; 
    title: string; 
    children: React.ReactNode 
  }) => {
    const isOpen = openSection === id;
    
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={() => setOpenSection(isOpen ? null : id)}
        className="w-full"
      >
        <CollapsibleTrigger className="w-full">
          <div className="glass-card flex justify-between items-center w-full mb-2">
            <h2 className="text-2xl font-semibold text-left">{title}</h2>
            {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="animate-accordion-down">
          <Card className="glass mb-6">
            <CardContent className="pt-6">
              {children}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Mystic Spielregeln
        </h1>

        <div className="space-y-6">
          <RuleSection id="overview" title="Allgemeine Regeln">
            <p className="mb-4">
              Das Ziel ist es, am Ende des Spiels die wenigsten Punkte auf der Hand zu haben, 
              indem man strategisch Karten austauscht und besondere Aktionskarten nutzt. 
              Jeder Spieler hat teilweise verdeckte Karten, deren Werte er nur begrenzt kennt.
            </p>
          </RuleSection>

          <RuleSection id="preparation" title="Spielvorbereitung">
            <ol className="list-decimal list-inside space-y-2">
              <li>Jeder Spieler erhält je nach Spielmodus vier, fünf oder sechs Karten und legt sie unangesehen und verdeckt nebeneinander vor sich auf den Tisch (eigene Auslage).</li>
              <li>Der Rest der Karten kommt verdeckt als Nachziehstapel in die Mitte des Tisches.</li>
              <li>Eine Karte wird vom Nachziehstapel gezogen und aufgedeckt neben den Nachziehstapel gelegt: Sie markiert den Anfang des Ablagestapels.</li>
              <li>Jeder Spieler darf sich einmalig zwei seiner vor ihm ausliegenden Karten ansehen.</li>
              <li>Ein Startspieler wird bestimmt und das Spiel beginnt.</li>
            </ol>
          </RuleSection>

          <RuleSection id="gameplay" title="Spielverlauf">
            <p className="mb-4">Gespielt wird nacheinander im Uhrzeigersinn. Wenn ein Spieler an der Reihe ist, kann er eine der folgenden Optionen wählen:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Ablagestapelkarte nehmen:</h3>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Die oberste Karte des Ablagestapels nehmen und durch eine Karte der eigenen Auslage ersetzen.</li>
                  <li>Hat ein Spieler eine identische Karte wie die gerade auf den Ablagestapel gelegte, kann er bis zu zwei dieser Karten direkt auf den Ablagestapel werfen.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Nachziehstapelkarte ziehen:</h3>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Die oberste Karte des Nachziehstapels ziehen und dann:</li>
                  <ul className="list-circle list-inside pl-8 space-y-1">
                    <li>direkt auf den Ablagestapel werfen oder</li>
                    <li>mit einer Karte der eigenen Auslage ersetzen oder</li>
                    <li>wenn es sich um eine Aktionskarte handelt, die Aktion ausführen</li>
                  </ul>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Mystic Call ansagen:</h3>
                <p className="pl-4">Wenn ein Spieler glaubt, dass er die wenigsten Punkte hat, kann er "Mystic Call" ansagen. 
                Alle anderen Spieler sind dann noch einmal am Zug.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Mystic Duel:</h3>
                <p className="pl-4">Ein Spieler kann einen anderen zu einem Duell herausfordern. 
                Beide decken eine verdeckte Karte auf. Der Verlierer muss seine Karte durch die des Gewinners ersetzen.</p>
              </div>
            </div>
          </RuleSection>

          <RuleSection id="action-cards" title="Aktionskarten">
            <p className="mb-4">Aktionskarten können jederzeit im eigenen Zug gespielt werden. 
            Ungespielte Aktionskarten zählen 11 Punkte am Ende.</p>
            
            <ul className="space-y-2">
              <li><strong>Mystic Glimpse:</strong> Eine eigene Karte ansehen</li>
              <li><strong>Mystic Inspect:</strong> Eine Karte eines anderen Spielers ansehen</li>
              <li><strong>Mystic Swap:</strong> Karten mit einem anderen Spieler tauschen</li>
              <li><strong>Mystic Shield:</strong> Schutz vor bestimmten Aktionen für eine Runde</li>
              <li><strong>Mystic Discard:</strong> Eine eigene Karte abwerfen</li>
              <li><strong>Mystic Chaos:</strong> Karten eines anderen Spielers mischen</li>
              <li><strong>Mystic Glimpse and Swap:</strong> Karten ansehen und tauschen</li>
              <li><strong>Mystic Reveal:</strong> Karte eines anderen Spielers aufdecken</li>
              <li><strong>Mystic Shuffle:</strong> Eigene Karten mischen und zwei ansehen</li>
            </ul>
          </RuleSection>

          <RuleSection id="scoring" title="Schlusswertung">
            <div className="space-y-4">
              <p>Am Ende des Spiels deckt jeder Spieler seine Auslage auf und addiert die Punktewerte:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Spieler mit den wenigsten Punkten: 0 Punkte</li>
                <li>Andere Spieler: Ihre Punkte als Minuspunkte</li>
                <li>Falscher Mystic Call: 5 zusätzliche Strafpunkte</li>
              </ul>
            </div>
          </RuleSection>

          <RuleSection id="kamikaze" title="Kamikaze-Herausforderung">
            <div className="space-y-4">
              <p className="font-semibold">Optionale Regel für risikofreudige Spieler:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Karten in absteigender Reihenfolge: 0 Punkte</li>
                <li>Alle anderen Spieler: 25 Minuspunkte</li>
              </ul>
            </div>
          </RuleSection>

          <RuleSection id="additional" title="Zusätzlicher Tipp">
            <div className="space-y-4">
              <p>Für mehrere Partien:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Minuspunkte werden addiert</li>
                <li>Spielende bei über 100 Minuspunkten</li>
                <li>Genau 100 Minuspunkte: Reduktion auf 50</li>
                <li>Gewinner: Wenigste Gesamtpunkte</li>
              </ul>
            </div>
          </RuleSection>
        </div>
      </main>
    </div>
  );
};

export default Rules;