import { Navigation } from "@/components/Navigation";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Image from "@/components/ui/image";

interface CardData {
  id: string;
  name: string;
  image: string;
  description: string;
  rules: string[];
}

// Temporäres Mapping der Kartendaten
const cardData: { [key: string]: CardData } = {
  "mystic-glimpse": {
    id: "mystic-glimpse",
    name: "Mystic Glimpse",
    image: "/lovable-uploads/b0445aec-ba62-4095-a3bf-a45c1513951f.png",
    description: "Erlaubt dir, eine deiner Karten anzusehen.",
    rules: [
      "Kann in deinem Zug eingesetzt werden",
      "Erlaubt dir, eine deiner Karten anzusehen",
      "Der Kristall verbraucht keine zusätzliche Aktion"
    ]
  },
  "mystic-inspect": {
    id: "mystic-inspect",
    name: "Mystic Inspect",
    image: "/lovable-uploads/7be60b9e-74ab-4aac-8467-80a677c66606.png",
    description: "Erlaubt dir, eine Karte eines anderen Spielers anzusehen.",
    rules: [
      "Kann in deinem Zug eingesetzt werden",
      "Wähle einen Spieler und eine seiner Karten",
      "Sieh dir die gewählte Karte an"
    ]
  },
  "mystic-swap": {
    id: "mystic-swap",
    name: "Mystic Swap",
    image: "/lovable-uploads/6e59fd5d-ca25-4954-a95d-058a6b044ce0.png",
    description: "Tausche Karten mit einem anderen Spieler.",
    rules: [
      "Kann in deinem Zug eingesetzt werden",
      "Wähle einen Spieler und zwei Karten zum Tauschen",
      "Die Karten werden getauscht ohne sie anzusehen"
    ]
  }
};

const CardDetail = () => {
  const { id } = useParams();
  const card = id ? cardData[id] : null;

  if (!card) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <h1 className="text-4xl font-bold mb-8 text-center">Karte nicht gefunden</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                {card.name}
              </h1>
              
              <div className="flex justify-center">
                <Image
                  src={card.image}
                  alt={card.name}
                  className="w-64 h-auto rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <p className="text-lg text-center">{card.description}</p>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Regeln:</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {card.rules.map((rule, index) => (
                      <li key={index} className="text-gray-700">{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CardDetail;