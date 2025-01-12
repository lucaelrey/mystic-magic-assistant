import { Navigation } from "@/components/Navigation";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { BookOpen, FileText, List, Home } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Rules = () => {
  const [activeSection, setActiveSection] = useState<number | null>(0);

  const tabs = [
    { title: "Übersicht", icon: Home },
    { title: "Vorbereitung", icon: List },
    { type: "separator" as const },
    { title: "Spielablauf", icon: BookOpen },
    { title: "Aktionskarten", icon: FileText },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 0:
        return (
          <Card className="glass">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Allgemeine Regeln</h2>
              <p className="mb-4">
                Das Ziel ist es, am Ende des Spiels die wenigsten Punkte auf der Hand zu haben, 
                indem man strategisch Karten austauscht und besondere Aktionskarten nutzt. 
                Jeder Spieler hat teilweise verdeckte Karten, deren Werte er nur begrenzt kennt.
              </p>
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <Card className="glass">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Spielvorbereitung</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Jeder Spieler erhält je nach Spielmodus vier, fünf oder sechs Karten und legt sie unangesehen und verdeckt nebeneinander vor sich auf den Tisch (eigene Auslage).</li>
                <li>Der Rest der Karten kommt verdeckt als Nachziehstapel in die Mitte des Tisches.</li>
                <li>Eine Karte wird vom Nachziehstapel gezogen und aufgedeckt neben den Nachziehstapel gelegt: Sie markiert den Anfang des Ablagestapels.</li>
                <li>Jeder Spieler darf sich einmalig zwei seiner vor ihm ausliegenden Karten ansehen.</li>
                <li>Ein Startspieler wird bestimmt und das Spiel beginnt.</li>
              </ol>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="glass">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Spielverlauf</h2>
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
                  <ul className="list-disc list-inside pl-4">
                    <li>Die oberste Karte des Nachziehstapels ziehen und dann:</li>
                    <ul className="list-circle list-inside pl-8 space-y-1">
                      <li>direkt auf den Ablagestapel werfen oder</li>
                      <li>mit einer Karte der eigenen Auslage ersetzen oder</li>
                      <li>wenn es sich um eine Aktionskarte handelt, die Aktion ausführen</li>
                    </ul>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card className="glass">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Aktionskarten</h2>
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
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Mystic Spielregeln
        </h1>

        <div className="mb-8">
          <ExpandableTabs 
            tabs={tabs} 
            onChange={setActiveSection}
            className="glass"
          />
        </div>

        <div className="space-y-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Rules;