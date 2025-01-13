import React from "react";
import { Navigation } from "@/components/Navigation";
import { FileText, Book, Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CardGrid } from "@/components/CardGrid";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RulesOverview } from "@/components/rules/RulesOverview";
import { ActionCardsView } from "@/components/cards/ActionCardsView";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

const Rules = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { title: "Übersicht", icon: Book },
    { title: "Zahlenkarten", icon: FileText },
    { type: "separator" as const },
    { title: "Aktionskarten", icon: Wand2 },
  ];

  const getSelectedTabIndex = () => {
    switch (location.pathname) {
      case "/rules":
        return 0;
      case "/rules/number-cards":
        return 1;
      case "/rules/action-cards":
        return 3;
      default:
        return null;
    }
  };

  const handleTabChange = (index: number | null) => {
    switch (index) {
      case 0:
        navigate("/rules");
        break;
      case 1:
        navigate("/rules/number-cards");
        break;
      case 3:
        navigate("/rules/action-cards");
        break;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-center">
          Spielregeln
        </h1>

        <ExpandableTabs
          tabs={tabs}
          className="mb-8 mx-auto max-w-2xl"
          onChange={handleTabChange}
        />

        <Outlet />
      </main>
    </div>
  );
};

const NumberCards = () => {
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
              <li>
                Die Anzahl der Karten variiert je nach Wert:
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
};

const ActionCards = () => {
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
      <ActionCardsView />
    </div>
  );
};

Rules.Overview = RulesOverview;
Rules.NumberCards = NumberCards;
Rules.ActionCards = ActionCards;

export default Rules;