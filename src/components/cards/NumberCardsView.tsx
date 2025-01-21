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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "@/components/ui/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CardDetails } from "./CardDetails";

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
    <div 
      className="glass-card cursor-pointer h-full"
      onClick={() => handleCardClick(card)}
    >
      <div className="relative overflow-hidden rounded-lg h-full">
        <Image
          src={card.image}
          alt={card.name}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full relative"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {cards.map((card) => (
          <CarouselItem 
            key={card.id} 
            className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
          >
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};