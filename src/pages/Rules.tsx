import React from "react";
import { Navigation } from "@/components/Navigation";
import { Book, Hash, Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Accordion } from "@/components/ui/accordion";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { GeneralRules } from "@/components/rules/GeneralRules";
import { GamePreparation } from "@/components/rules/GamePreparation";
import { GameplayRules } from "@/components/rules/GameplayRules";
import { NumberCardsScoring } from "@/components/rules/NumberCardsScoring";
import { ActionCardsView } from "@/components/cards/ActionCardsView";
import { NumberCardsView } from "@/components/cards/NumberCardsView";

const Rules = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { title: "Übersicht", icon: Book },
    { type: "separator" as const },
    { title: "Zahlenkarten", icon: Hash },
    { type: "separator" as const },
    { title: "Aktionskarten", icon: Wand2 },
  ];

  const getSelectedTabIndex = () => {
    switch (location.pathname) {
      case "/rules":
        return 0;
      case "/rules/number-cards":
        return 2;
      case "/rules/action-cards":
        return 4;
      default:
        return 0;
    }
  };

  const handleTabChange = (index: number | null) => {
    switch (index) {
      case 0:
        navigate("/rules");
        break;
      case 2:
        navigate("/rules/number-cards");
        break;
      case 4:
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
          defaultSelected={getSelectedTabIndex()}
          onChange={handleTabChange}
        />

        <Outlet />
      </main>
    </div>
  );
};

const RulesOverview = () => (
  <div className="space-y-6">
    <Card className="glass">
      <CardContent className="pt-6">
        <Accordion type="single" defaultValue="general" collapsible>
          <GeneralRules />
          <GamePreparation />
          <GameplayRules />
        </Accordion>
      </CardContent>
    </Card>
  </div>
);

const NumberCards = () => {
  const numberCards = [
    {
      id: "crystal-of-mystara",
      name: "Crystal of Mystara",
      image: "/lovable-uploads/92d9a031-41af-41d1-a4b7-5680558048b7.png",
      description: "Der mächtigste und reinste Gegenstand in Mystara, der das Gleichgewicht aller Elemente repräsentiert. Der Kristall ist frei von negativen Einflüssen und symbolisiert ultimative Harmonie.",
      rules: [
        "Zählt 0 Punkte (beste Karte)"
      ]
    },
    {
      id: "air-spirit",
      name: "Air Spirit",
      image: "/lovable-uploads/4a0a91dc-19d7-461e-bc2d-cc08e928bd9b.png",
      description: "Der Luftgeist ist dem Kristall der Reinheit am nächsten. Er symbolisiert Freiheit, Leichtigkeit und das lebensspendende Element Luft. Seine Reinheit und Subtilität machen ihn fast unschlagbar.",
      rules: [
        "Zählt 1 Punkt"
      ]
    },
    {
      id: "fire-spirit",
      name: "Fire Spirit",
      image: "/lovable-uploads/2c656447-f2b8-4b82-bbdc-03acbf485470.png",
      description: "Der Feuergeist verkörpert das Element der Transformation und der Zerstörung. Feuer bringt Licht und Wärme, kann aber auch unberechenbar und zerstörerisch sein.",
      rules: [
        "Zählt 2 Punkte"
      ]
    },
    {
      id: "water-spirit",
      name: "Water Being",
      image: "/lovable-uploads/5eb7f9b5-7e62-4a0e-9a0b-475371b47d96.png",
      description: "Wasser steht für Leben und Reinheit, ist jedoch auch mächtig und dual. Es kann reinigen und nähren, aber auch mit unvorhersehbarer Gewalt zuschlagen.",
      rules: [
        "Zählt 3 Punkte"
      ]
    },
    {
      id: "earth-golem",
      name: "Earth Golem",
      image: "/lovable-uploads/c0447c65-09b5-4d92-9af0-75382d8eeecc.png",
      description: "Der Erdgolem repräsentiert Stabilität und Stärke. Die Erde ist das Fundament, das alles trägt, jedoch fehlt ihr die Flexibilität und Leichtigkeit anderer Elemente.",
      rules: [
        "Zählt 4 Punkte"
      ]
    },
    {
      id: "lightning-dragon",
      name: "Lightning Dragon",
      image: "/lovable-uploads/0da30d74-c2d9-4359-b2ec-d719a8a8f163.png",
      description: "Der Blitzdrache symbolisiert rohe Energie und tödliche Kraft. Blitze sind schnell und mächtig, aber kurzlebig und oft unberechenbar.",
      rules: [
        "Zählt 5 Punkte"
      ]
    },
    {
      id: "light-creature",
      name: "Light Guardian",
      image: "/lovable-uploads/4f1166a6-f569-4660-8359-62ca221f471c.png",
      description: "Licht bringt Wahrheit, Klarheit und vertreibt die Dunkelheit. Es ist kraftvoll, aber manchmal blendend und daher nicht so subtil wie Luft oder Wasser.",
      rules: [
        "Zählt 6 Punkte"
      ]
    },
    {
      id: "shadow-creature",
      name: "Shadow Creature",
      image: "/lovable-uploads/1a601945-594a-4edc-a523-9a553e15d77e.png",
      description: "Schatten sind geheimnisvoll, gefährlich und verbergen das Unbekannte. Sie verschlucken das Licht, sind jedoch weniger greifbar und weniger konstruktiv als andere Elemente.",
      rules: [
        "Zählt 7 Punkte"
      ]
    },
    {
      id: "mist-spirit",
      name: "Mist Spirit",
      image: "/lovable-uploads/0a26debc-50c7-449d-abd5-b921e7556958.png",
      description: "Der Nebelgeist steht für das Geheimnisvolle und das Undurchsichtige. Nebel verwirrt und verschleiert die Wahrheit, was ihn mächtig, aber schwer fassbar macht.",
      rules: [
        "Zählt 8 Punkte"
      ]
    },
    {
      id: "forest-nymph",
      name: "Forest Nymph",
      image: "/lovable-uploads/30e449f4-8a6f-4938-9688-f11bc193aea6.png",
      description: "Die Waldnymphe repräsentiert Leben, Wachstum und Beständigkeit. Sie ist tief verwurzelt und stark, aber ihre Starrheit hindert sie daran, flexibel auf Veränderungen zu reagieren.",
      rules: [
        "Zählt 9 Punkte"
      ]
    },
    {
      id: "storm-titan",
      name: "Storm Titan",
      image: "/lovable-uploads/cedd5823-0f83-410b-bd70-9346042f118f.png",
      description: "Der Sturmtitan ist das mächtigste und destruktivste Element. Er verkörpert Chaos und Unkontrollierbarkeit. Seine rohe Kraft ist unübertroffen, doch gerade diese macht ihn zur schlechtesten Karte im Spiel.",
      rules: [
        "Zählt 10 Punkte (schlechteste Karte)"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <NumberCardsScoring />
      <NumberCardsView cards={numberCards} />
    </div>
  );
};

Rules.Overview = RulesOverview;
Rules.NumberCards = NumberCards;
Rules.ActionCards = ActionCardsView;

export default Rules;
