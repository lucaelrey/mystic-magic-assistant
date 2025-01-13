import React, { useState } from "react";
import { Card } from "@/components/ui/card";
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

  if (isDesktop) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {actionCards.map((card) => (
          <Dialog
            key={card.id}
            open={open && selectedCard?.id === card.id}
            onOpenChange={setOpen}
          >
            <DialogTrigger asChild>
              <Card
                className="w-full h-48 cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden glass flex items-center justify-center p-0"
                onClick={() => handleCardClick(card)}
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-contain"
                />
              </Card>
            </DialogTrigger>
            <DialogContent className="glass sm:max-w-[425px]">
              <DialogHeader>
                <CardDetails card={card} className="mt-4" />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {actionCards.map((card) => (
        <Drawer
          key={card.id}
          open={open && selectedCard?.id === card.id}
          onOpenChange={setOpen}
        >
          <DrawerTrigger asChild>
            <Card
              className="w-full h-48 cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden glass flex items-center justify-center p-0"
              onClick={() => handleCardClick(card)}
            >
              <Image
                src={card.image}
                alt={card.name}
                className="w-full h-full object-contain"
              />
            </Card>
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
      ))}
    </div>
  );
};