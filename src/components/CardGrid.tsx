import React from "react";
import { Card } from "@/components/ui/card";
import Image from "./ui/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

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
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => {
              setSelectedCard(card);
              setOpen(true);
            }}
          >
            <Image
              src={card.image}
              alt={card.name}
              className="w-full h-auto rounded-lg"
            />
          </Card>
        ))}
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        {selectedCard && (
          <DrawerContent>
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader className="text-left">
                <DrawerTitle>{selectedCard.name}</DrawerTitle>
                <DrawerDescription>
                  {selectedCard.description}
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
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
                      <h3 className="text-lg font-semibold mb-2">Regeln</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {selectedCard.rules.map((rule, index) => (
                          <li key={index}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Schließen</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        )}
      </Drawer>
    </div>
  );
};