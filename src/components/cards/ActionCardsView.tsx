import React, { useState } from "react";
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
  const [selectedCard, setSelectedCard] = useState<(typeof actionCards)[0] | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCardClick = (card: (typeof actionCards)[0]) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const renderCardContent = (card: (typeof actionCards)[0]) => (
    <div 
      className="glass-card cursor-pointer"
      onClick={() => handleCardClick(card)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={card.image}
          alt={card.name}
          className="w-full h-full object-contain p-4"
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {actionCards.map((card) => (
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
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Schließen
                  </Button>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      ))}
    </div>
  );
};