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
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

  const handleCardClick = (card: NumberCard) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const getTranslatedCard = (card: NumberCard) => {
    const translationKey = `cards.${card.id.replace(/-/g, '')}`;
    const translatedRules = t(`${translationKey}.rules`);
    
    // Ensure rules is always an array
    let rulesArray: string[];
    if (Array.isArray(translatedRules)) {
      rulesArray = translatedRules;
    } else if (typeof translatedRules === 'string') {
      rulesArray = [translatedRules];
    } else {
      // Fallback to original rules if translation is missing
      rulesArray = card.rules;
      console.warn(`Translation missing for ${translationKey}.rules`);
    }
    
    return {
      ...card,
      name: t(`${translationKey}.name`) || card.name,
      description: t(`${translationKey}.description`) || card.description,
      rules: rulesArray,
    };
  };

  const renderCardContent = (card: NumberCard) => (
    <div 
      className="glass-card cursor-pointer"
      onClick={() => handleCardClick(card)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={card.image}
          alt={t(`cards.${card.id.replace(/-/g, '')}.name`) || card.name}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const translatedCard = getTranslatedCard(card);
        return (
          <div key={card.id}>
            {isDesktop ? (
              <Dialog open={open && selectedCard?.id === card.id} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  {renderCardContent(translatedCard)}
                </DialogTrigger>
                <DialogContent className="glass sm:max-w-[425px]">
                  <DialogHeader>
                    <CardDetails card={translatedCard} className="mt-4" />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ) : (
              <Drawer open={open && selectedCard?.id === card.id} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  {renderCardContent(translatedCard)}
                </DrawerTrigger>
                <DrawerContent className="px-4">
                  <DrawerHeader className="text-left">
                    <CardDetails card={translatedCard} className="pb-4" />
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        );
      })}
    </div>
  );
};