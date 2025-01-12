import React from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "./ui/image";

interface CardData {
  id: string;
  name: string;
  image: string;
  description: string;
  rules: string[];
}

interface CardGridProps {
  cards: CardData[];
}

export const CardGrid = ({ cards }: CardGridProps) => {
  const [selectedCard, setSelectedCard] = React.useState<CardData | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => setSelectedCard(card)}
          >
            <Image
              src={card.image}
              alt={card.name}
              className="w-full h-auto rounded-lg"
            />
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        {selectedCard && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedCard.name}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Image
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Beschreibung</h3>
                  <p>{selectedCard.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Regeln</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {selectedCard.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};