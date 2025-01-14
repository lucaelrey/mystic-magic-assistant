import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "@/components/ui/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CardDetails } from "./CardDetails";
import { GlareCard } from "@/components/ui/glare-card";

interface NumberCard {
  id: string;
  name: string;
  image: string;
  description: string;
  rules: string[];
}

interface NumberCardsViewProps {
  cards: NumberCard[];
}

export const NumberCardsView = ({ cards }: NumberCardsViewProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<NumberCard | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCardClick = (card: NumberCard) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const renderCardContent = (card: NumberCard) => (
    <GlareCard className="cursor-pointer">
      <div className="relative h-full">
        <Image
          src={card.image}
          alt={card.name}
          className="w-full h-full object-contain"
        />
      </div>
    </GlareCard>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div key={card.id} onClick={() => handleCardClick(card)}>
          {isDesktop ? (
            <Dialog open={open && selectedCard?.id === card.id} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                {renderCardContent(card)}
              </DialogTrigger>
              <DialogContent className="glass sm:max-w-[425px]">
                <DialogHeader>
                  <CardDetails card={card} className="mt-4" />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={open && selectedCard?.id === card.id} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                {renderCardContent(card)}
              </DrawerTrigger>
              <DrawerContent className="px-4">
                <DrawerHeader className="text-left">
                  <CardDetails card={card} className="pb-4" />
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      ))}
    </div>
  );
};