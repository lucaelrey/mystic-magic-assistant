import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CardDetails } from "./CardDetails";
import { actionCards } from "@/data/actionCards";

export const ActionCardsView = () => {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<typeof actionCards[0] | null>(
    null
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCardClick = (card: typeof actionCards[0]) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const renderCardContent = (card: typeof actionCards[0]) => (
    <div 
      className="relative group cursor-pointer glass-card h-full transition-all duration-300 hover:scale-105"
      onClick={() => handleCardClick(card)}
    >
      <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
        <Image
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <h3 className="text-white font-semibold text-lg">{card.name}</h3>
        </div>
      </div>
    </div>
  );

  const carouselView = (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {actionCards.map((card, index) => (
          <CarouselItem key={card.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
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
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">
                      Schließen
                    </Button>
                  </DrawerClose>
                </DrawerContent>
              </Drawer>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-center gap-2 mt-4">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  );

  return (
    <div className="space-y-6">
      {carouselView}
    </div>
  );
};