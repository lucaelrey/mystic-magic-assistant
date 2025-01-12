import { Navigation } from "@/components/Navigation";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { BookOpen, FileText, List, Home, Grid } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { CardCarousel } from "@/components/ui/card-carousel";

const Rules = () => {
  const [activeSection, setActiveSection] = useState<number | null>(0);

  const tabs = [
    { title: "Übersicht", icon: Home },
    { type: "separator" as const },
    { title: "Zahlenkarten", icon: Grid },
    { title: "Aktionskarten", icon: FileText },
  ];

  const numberCardsContent = [
    {
      title: "-2 bis 0",
      description: "Je 5 Karten im Spiel. Negative Zahlen geben Pluspunkte!",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white text-4xl font-bold">
          -2 bis 0
        </div>
      ),
    },
    {
      title: "1 bis 5",
      description: "Je 10 Karten im Spiel. Die häufigsten Karten im Deck.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white text-4xl font-bold">
          1 bis 5
        </div>
      ),
    },
    {
      title: "6 bis 9",
      description: "Je 8 Karten im Spiel. Mittlere Häufigkeit, höhere Punktzahl.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white text-4xl font-bold">
          6 bis 9
        </div>
      ),
    },
    {
      title: "10 bis 12",
      description: "Je 4 Karten im Spiel. Die seltensten und wertvollsten Karten.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white text-4xl font-bold">
          10 bis 12
        </div>
      ),
    },
  ];

  const actionCardsContent = [
    {
      title: "Mystic Glimpse",
      description: "Schaue dir eine deiner verdeckten Karten an.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white text-xl font-bold">
          👁️ Mystic Glimpse
        </div>
      ),
    },
    {
      title: "Mystic Inspect",
      description: "Schaue dir eine verdeckte Karte eines Mitspielers an.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white text-xl font-bold">
          🔍 Mystic Inspect
        </div>
      ),
    },
    {
      title: "Mystic Swap",
      description: "Tausche eine deiner Karten mit der eines Mitspielers.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white text-xl font-bold">
          🔄 Mystic Swap
        </div>
      ),
    },
    {
      title: "Mystic Shield",
      description: "Schütze dich für eine Runde vor Aktionskarten.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white text-xl font-bold">
          🛡️ Mystic Shield
        </div>
      ),
    },
    {
      title: "Mystic Chaos",
      description: "Mische die Karten eines Mitspielers neu.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white text-xl font-bold">
          🌀 Mystic Chaos
        </div>
      ),
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 0:
        return (
          <div className="space-y-6">
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
          </div>
        );
      case 2:
        return (
          <Card className="glass">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Zahlenkarten</h2>
              <CardCarousel>
                <img 
                  src="/lovable-uploads/7be60b9e-74ab-4aac-8467-80a677c66606.png" 
                  alt="Crystal of Mystara"
                  className="w-full aspect-[1/1.4] object-contain"
                />
                {/* Add more number cards here */}
              </CardCarousel>
              <div className="mt-8">
                <StickyScroll content={numberCardsContent} />
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="glass">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Aktionskarten</h2>
              <CardCarousel>
                <img 
                  src="/lovable-uploads/7be60b9e-74ab-4aac-8467-80a677c66606.png" 
                  alt="Crystal of Mystara"
                  className="w-full aspect-[1/1.4] object-contain"
                />
                {/* Add more action cards here */}
              </CardCarousel>
              <p className="mb-4 mt-8">Aktionskarten können jederzeit im eigenen Zug gespielt werden. 
              Ungespielte Aktionskarten zählen 11 Punkte am Ende.</p>
              <StickyScroll content={actionCardsContent} />
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