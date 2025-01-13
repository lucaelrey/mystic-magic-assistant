import { Navigation } from "@/components/Navigation";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { BookOpen, FileText, List, Home, Grid } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CardGrid } from "@/components/CardGrid";
import { actionCards } from "@/data/actionCards";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "@/components/ui/image";

const Rules = () => {
  const [activeSection, setActiveSection] = useState<number | null>(0);

  const tabs = [
    { title: "Übersicht", icon: Home },
    { type: "separator" as const },
    { title: "Zahlenkarten", icon: Grid },
    { title: "Aktionskarten", icon: FileText },
  ];

  const numberCards = [
    {
      id: "crystal-of-mystara",
      name: "Crystal of Mystara",
      image: "/lovable-uploads/92d9a031-41af-41d1-a4b7-5680558048b7.png",
      description: "Ein mystischer Kristall mit dem Wert 0.",
      rules: [
        "Zählt 0 Punkte",
        "Kann nicht durch Aktionskarten beeinflusst werden",
        "Bleibt immer an seiner Position"
      ]
    },
    {
      id: "air-spirit",
      name: "Air Spirit",
      image: "/lovable-uploads/4a0a91dc-19d7-461e-bc2d-cc08e928bd9b.png",
      description: "Ein Luftgeist mit dem Wert 1.",
      rules: [
        "Zählt 1 Punkt",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Windeffekte"
      ]
    },
    {
      id: "fire-spirit",
      name: "Fire Spirit",
      image: "/lovable-uploads/2c656447-f2b8-4b82-bbdc-03acbf485470.png",
      description: "Ein Feuergeist mit dem Wert 2.",
      rules: [
        "Zählt 2 Punkte",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Feuereffekte"
      ]
    },
    {
      id: "water-spirit",
      name: "Water Spirit",
      image: "/lovable-uploads/5eb7f9b5-7e62-4a0e-9a0b-475371b47d96.png",
      description: "Ein Wassergeist mit dem Wert 3.",
      rules: [
        "Zählt 3 Punkte",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Wassereffekte"
      ]
    },
    {
      id: "earth-golem",
      name: "Earth Golem",
      image: "/lovable-uploads/c0447c65-09b5-4d92-9af0-75382d8eeecc.png",
      description: "Ein Erdgolem mit dem Wert 4.",
      rules: [
        "Zählt 4 Punkte",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Erdeffekte"
      ]
    },
    {
      id: "lightning-dragon",
      name: "Lightning Dragon",
      image: "/lovable-uploads/0da30d74-c2d9-4359-b2ec-d719a8a8f163.png",
      description: "Ein Blitzdrache mit dem Wert 5.",
      rules: [
        "Zählt 5 Punkte",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Blitzeffekte"
      ]
    },
    {
      id: "light-creature",
      name: "Light Creature",
      image: "/lovable-uploads/4f1166a6-f569-4660-8359-62ca221f471c.png",
      description: "Eine Lichtkreatur mit dem Wert 6.",
      rules: [
        "Zählt 6 Punkte",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Lichteffekte"
      ]
    },
    {
      id: "shadow-creature",
      name: "Shadow Creature",
      image: "/lovable-uploads/1a601945-594a-4edc-a523-9a553e15d77e.png",
      description: "Eine Schattenkreatur mit dem Wert 7.",
      rules: [
        "Zählt 7 Punkte",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Schatteneffekte"
      ]
    },
    {
      id: "mist-spirit",
      name: "Mist Spirit",
      image: "/lovable-uploads/0a26debc-50c7-449d-abd5-b921e7556958.png",
      description: "Ein Nebelgeist mit dem Wert 8.",
      rules: [
        "Zählt 8 Punkte",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Nebeleffekte"
      ]
    },
    {
      id: "forest-nymph",
      name: "Forest Nymph",
      image: "/lovable-uploads/30e449f4-8a6f-4938-9688-f11bc193aea6.png",
      description: "Eine Waldnymphe mit dem Wert 9.",
      rules: [
        "Zählt 9 Punkte",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Natureffekte"
      ]
    },
    {
      id: "storm-titan",
      name: "Storm Titan",
      image: "/lovable-uploads/cedd5823-0f83-410b-bd70-9346042f118f.png",
      description: "Ein Sturmtitan mit dem Wert 10.",
      rules: [
        "Zählt 10 Punkte",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Sturmeffekte"
      ]
    }
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
          <div className="space-y-6">
            <Card className="glass">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Zahlenkarten</h2>
                <div className="space-y-4">
                  <h3 className="font-semibold mb-2">Werte und Verteilung:</h3>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>Die Zahlenkarten haben Werte von -2 bis 12</li>
                    <li>Jeder Wert ist mehrfach im Spiel vorhanden</li>
                    <li>Die Anzahl der Karten variiert je nach Wert:
                      <ul className="list-circle list-inside pl-8 space-y-1">
                        <li>-2 bis 0: je 5 Karten</li>
                        <li>1 bis 5: je 10 Karten</li>
                        <li>6 bis 9: je 8 Karten</li>
                        <li>10 bis 12: je 4 Karten</li>
                      </ul>
                    </li>
                  </ul>
                  <h3 className="font-semibold mb-2">Punktewertung:</h3>
                  <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>Jede Karte zählt ihren aufgedruckten Wert als Minuspunkte</li>
                    <li>Negative Zahlen geben Pluspunkte</li>
                    <li>Das Ziel ist es, möglichst wenig (Minus-)Punkte zu sammeln</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <CardGrid cards={numberCards} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <Card className="glass">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Aktionskarten</h2>
                <p className="mb-4">
                  Aktionskarten können jederzeit im eigenen Zug gespielt werden. 
                  Ungespielte Aktionskarten zählen am Ende des Spiels als 11 Punkte.
                </p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {actionCards.map((card) => (
                <Dialog key={card.id}>
                  <DialogTrigger asChild>
                    <Card className="w-full cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="glass">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold mb-2">{card.name}</DialogTitle>
                      <DialogDescription>
                        <p className="mt-2 mb-4 text-foreground">{card.description}</p>
                        <h3 className="font-semibold mb-2">Regeln:</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {card.rules.map((rule, index) => (
                            <li key={index} className="text-foreground">{rule}</li>
                          ))}
                        </ul>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
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
