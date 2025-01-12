import React from "react";
import { Card } from "@/components/ui/card";
import Image from "./ui/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Dialog key={card.id}>
          <DialogTrigger asChild>
            <Card className="w-full cursor-pointer hover:scale-105 transition-transform duration-200">
              <div className="p-4">
                <Image
                  src={card.image}
                  alt={card.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="space-y-4">
              <div className="flex gap-4">
                <Image
                  src={card.image}
                  alt={card.name}
                  className="w-24 h-auto rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{card.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Regeln:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {card.rules.map((rule, index) => (
                    <li key={index} className="text-sm">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};