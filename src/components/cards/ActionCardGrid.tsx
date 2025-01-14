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
import { actionCards } from "@/data/actionCards";
import { GlareCard } from "@/components/ui/glare-card";

export const ActionCardGrid = () => {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<(typeof actionCards)[0] | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCardClick = (card: (typeof actionCards)[0]) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const renderCardContent = (card: (typeof actionCards)[0]) => (
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
      {actionCards.map((card) => (
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