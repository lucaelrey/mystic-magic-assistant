import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CardData {
  id: number;
  name: string;
  type: "number" | "action";
  value?: number;
  description: string;
  image: string;
  count?: number;
}

const cards: CardData[] = [
  {
    id: 1,
    name: "Fire Spirit",
    type: "action",
    description: "Verbrenne eine Karte eines Gegners. Diese Karte kann nicht durch andere Aktionskarten geschützt werden.",
    image: "/lovable-uploads/8bcc602b-f8c5-4bf2-90ca-e5f5f432291e.png",
    count: 2
  },
  // Weitere Karten hier hinzufügen
];

const CardGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {cards.map((card) => (
        <Dialog key={card.id}>
          <DialogTrigger asChild>
            <div className="cursor-pointer transform transition-all duration-300 hover:scale-105">
              <Card className="h-[300px] relative overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div>
                    <h3 className="text-2xl font-bold">{card.name}</h3>
                    {card.type === "number" && (
                      <div className="text-4xl font-bold">{card.value}</div>
                    )}
                  </div>
                  <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Klicken für Details
                  </div>
                </div>
              </Card>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-black/95 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{card.name}</DialogTitle>
              <DialogDescription className="text-gray-300">
                {card.type === "action" ? "Aktionskarte" : "Zahlenkarte"}
                {card.count && ` - ${card.count}x im Deck`}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <div 
                className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <p className="text-gray-200">{card.description}</p>
              {card.type === "number" && (
                <div className="mt-4">
                  <p className="text-xl font-semibold">Wert: {card.value}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default CardGrid;