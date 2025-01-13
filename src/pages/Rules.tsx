import React from "react";
import { Navigation } from "@/components/Navigation";
import { FileText, Book, Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CardGrid } from "@/components/CardGrid";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RulesOverview } from "@/components/rules/RulesOverview";
import { ActionCardsView } from "@/components/cards/ActionCardsView";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { NumberCardsView } from "@/components/cards/NumberCardsView";
import { RulesAI } from "@/components/rules/RulesAI";

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Outlet />
          </div>
          <div className="lg:col-span-1">
            <RulesAI />
          </div>
        </div>
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
      description: "Der mächtigste und reinste Gegenstand in Mystara, der das Gleichgewicht aller Elemente repräsentiert. Der Kristall ist frei von negativen Einflüssen und symbolisiert ultimative Harmonie.",
      rules: [
        "Zählt 0 Punkte (beste Karte)",
        "Kann nicht durch Aktionskarten beeinflusst werden",
        "Bleibt immer an seiner Position"
      ]
    },
    {
      id: "air-spirit",
      name: "Air Spirit",
      image: "/lovable-uploads/4a0a91dc-19d7-461e-bc2d-cc08e928bd9b.png",
      description: "Der Luftgeist ist dem Kristall der Reinheit am nächsten. Er symbolisiert Freiheit, Leichtigkeit und das lebensspendende Element Luft. Seine Reinheit und Subtilität machen ihn fast unschlagbar.",
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
      description: "Der Feuergeist verkörpert das Element der Transformation und der Zerstörung. Feuer bringt Licht und Wärme, kann aber auch unberechenbar und zerstörerisch sein.",
      rules: [
        "Zählt 2 Punkte",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Feuereffekte"
      ]
    },
    {
      id: "water-spirit",
      name: "Water Being",
      image: "/lovable-uploads/5eb7f9b5-7e62-4a0e-9a0b-475371b47d96.png",
      description: "Wasser steht für Leben und Reinheit, ist jedoch auch mächtig und dual. Es kann reinigen und nähren, aber auch mit unvorhersehbarer Gewalt zuschlagen.",
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
      description: "Der Erdgolem repräsentiert Stabilität und Stärke. Die Erde ist das Fundament, das alles trägt, jedoch fehlt ihr die Flexibilität und Leichtigkeit anderer Elemente.",
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
      description: "Der Blitzdrache symbolisiert rohe Energie und tödliche Kraft. Blitze sind schnell und mächtig, aber kurzlebig und oft unberechenbar.",
      rules: [
        "Zählt 5 Punkte",
        "Kann mit anderen Karten getauscht werden",
        "Reagiert auf Blitzeffekte"
      ]
    },
    {
      id: "light-creature",
      name: "Light Guardian",
      image: "/lovable-uploads/4f1166a6-f569-4660-8359-62ca221f471c.png",
      description: "Licht bringt Wahrheit, Klarheit und vertreibt die Dunkelheit. Es ist kraftvoll, aber manchmal blendend und daher nicht so subtil wie Luft oder Wasser.",
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
      description: "Schatten sind geheimnisvoll, gefährlich und verbergen das Unbekannte. Sie verschlucken das Licht, sind jedoch weniger greifbar und weniger konstruktiv als andere Elemente.",
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
      description: "Der Nebelgeist steht für das Geheimnisvolle und das Undurchsichtige. Nebel verwirrt und verschleiert die Wahrheit, was ihn mächtig, aber schwer fassbar macht.",
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
      description: "Die Waldnymphe repräsentiert Leben, Wachstum und Beständigkeit. Sie ist tief verwurzelt und stark, aber ihre Starrheit hindert sie daran, flexibel auf Veränderungen zu reagieren.",
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
      description: "Der Sturmtitan ist das mächtigste und destruktivste Element. Er verkörpert Chaos und Unkontrollierbarkeit. Seine rohe Kraft ist unübertroffen, doch gerade diese macht ihn zur schlechtesten Karte im Spiel.",
      rules: [
        "Zählt 10 Punkte (schlechteste Karte)",
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
              <li>Das Ziel ist es, möglichst wenig (Minus-)Punkte zu sammeln</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <NumberCardsView cards={numberCards} />
    </div>
  );
};

Rules.Overview = RulesOverview;
Rules.NumberCards = NumberCards;
Rules.ActionCards = ActionCardsView;

export default Rules;
