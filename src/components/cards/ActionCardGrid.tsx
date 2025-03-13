
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
import { useLanguage } from "@/contexts/LanguageContext";

export const ActionCardGrid = () => {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<(typeof actionCards)[0] | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { language, t } = useLanguage();

  const handleCardClick = (card: (typeof actionCards)[0]) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const getTranslatedCard = (card: (typeof actionCards)[0]) => {
    // Get action card translations from our hardcoded values if available
    const cardKey = card.id;
    const translatedData = {
      ...card,
      name: language === 'en' ? card.name_en || card.name : card.name,
      description: language === 'en' ? card.description_en || card.description : card.description,
      rules: language === 'en' ? card.rules_en || card.rules : card.rules,
    };

    // Use hardcoded translations if they exist
    if (t(`rules.actionCards.cards.${cardKey}`) !== `rules.actionCards.cards.${cardKey}`) {
      const hardcodedData = t(`rules.actionCards.cards.${cardKey}`);
      if (typeof hardcodedData === 'object') {
        return {
          ...card,
          name: hardcodedData.name || translatedData.name,
          description: hardcodedData.description || translatedData.description,
          rules: hardcodedData.rules || translatedData.rules,
        };
      }
    }

    return translatedData;
  };

  const renderCardContent = (card: (typeof actionCards)[0]) => (
    <article 
      className="glass-card cursor-pointer"
      onClick={() => handleCardClick(card)}
      role="button"
      tabIndex={0}
      aria-label={getTranslatedCard(card).name}
    >
      <div className="relative overflow-hidden rounded-lg">
        <picture>
          <source srcSet={`/lovable-uploads/${card.id}.webp`} type="image/webp" />
          <Image
            src={`/lovable-uploads/${card.id}.png`}
            alt={getTranslatedCard(card).name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </picture>
      </div>
    </article>
  );

  return (
    <section 
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
      aria-label={language === 'de' ? 'Aktionskarten' : 'Action Cards'}
    >
      {actionCards.map((card) => (
        <div key={card.id}>
          {isDesktop ? (
            <Dialog open={open && selectedCard?.id === card.id} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                {renderCardContent(card)}
              </DialogTrigger>
              <DialogContent className="glass sm:max-w-[425px]">
                <DialogHeader>
                  <CardDetails card={getTranslatedCard(card)} className="mt-4" />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={open && selectedCard?.id === card.id} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                {renderCardContent(card)}
              </DrawerTrigger>
              <DrawerContent className="bg-[#121212] px-4">
                <DrawerHeader className="text-left">
                  <CardDetails card={getTranslatedCard(card)} className="pb-4" />
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      ))}
    </section>
  );
};
