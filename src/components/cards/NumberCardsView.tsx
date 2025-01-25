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
import { useContent } from "@/hooks/useContent";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { isLoading } = useContent('number_card');

  const handleCardClick = (card: NumberCard) => {
    setSelectedCard(card);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(11)].map((_, index) => (
          <div key={index} className="glass-card">
            <Skeleton className="h-40 w-full" />
          </div>
        ))}
      </div>
    );
  }

  const renderCardContent = (card: NumberCard) => (
    <div 
      className="glass-card cursor-pointer"
      onClick={() => handleCardClick(card)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={card.image}
          alt={card.name}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div key={card.id}>
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