import { Navigation } from "@/components/Navigation";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { BookOpen, FileText, List, Home, Grid } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CardGrid from "@/components/CardGrid";

const Rules = () => {
  const [activeSection, setActiveSection] = useState<number | null>(0);

  const tabs = [
    { title: "Übersicht", icon: Home },
    { type: "separator" as const },
    { title: "Zahlenkarten", icon: Grid },
    { title: "Aktionskarten", icon: FileText },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 0:
        return (
          <div className="space-y-6">
            <Card className="glass bg-black/40">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Allgemeine Regeln</h2>
                <p className="mb-4">
                  Das Ziel ist es, am Ende des Spiels die wenigsten Punkte auf der Hand zu haben, 
                  indem man strategisch Karten austauscht und besondere Aktionskarten nutzt. 
                  Jeder Spieler hat teilweise verdeckte Karten, deren Werte er nur begrenzt kennt.
                </p>
              </CardContent>
            </Card>

            <Card className="glass bg-black/40">
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

            <Card className="glass bg-black/40">
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
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Card className="glass bg-black/40">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Zahlenkarten</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Werte und Verteilung:</h3>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                      <li>Die Zahlenkarten haben Werte von -2 bis 12</li>
                      <li>Jeder Wert ist mehrfach im Spiel vorhanden</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <CardGrid />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <Card className="glass bg-black/40">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Aktionskarten</h2>
                <p className="mb-4">Aktionskarten können jederzeit im eigenen Zug gespielt werden. 
                Ungespielte Aktionskarten zählen 11 Punkte am Ende.</p>
              </CardContent>
            </Card>
            <CardGrid />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: 'url("/lovable-uploads/7be60b9e-74ab-4aac-8467-80a677c66606.png")',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-center">
          Spielregeln
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
