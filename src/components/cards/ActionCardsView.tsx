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
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="glass">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Aktionskarten</h2>
          <p className="mb-4">
            Aktionskarten sind spezielle Karten, die besondere Fähigkeiten und Effekte im Spiel auslösen können. Sie bieten strategische Möglichkeiten, um das Spielgeschehen zu beeinflussen.
          </p>
          <div className="space-y-4">
            <h3 className="font-semibold mb-2">Wichtige Regeln:</h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>Aktionskarten können nur in deinem Zug gespielt werden</li>
              <li>Pro Zug darf maximal eine Aktionskarte gespielt werden</li>
              <li>Geschützte Spieler sind immun gegen die meisten Aktionskarten</li>
              <li>Nach dem Ausspielen kommt die Aktionskarte auf den Ablagestapel</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      {carouselView}
    </div>
  );
};