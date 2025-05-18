
import React from "react";
import { NumberCardsScoring } from "@/components/rules/NumberCardsScoring";
import { NumberCardsView } from "@/components/cards/NumberCardsView";
import { numberCards } from "@/data/numberCards";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";

const NumberCardsRoute = () => {
  const { language } = useLanguage();

  const title = language === 'de' 
    ? 'Zahlenkarten - Mystic Kartenspiel Regeln'
    : 'Number Cards - Mystic Card Game Rules';
  
  const description = language === 'de'
    ? 'Erfahren Sie alles über die Zahlenkarten im Mystic Kartenspiel. Von Werten und Punkten bis hin zu Strategien.'
    : 'Learn all about the number cards in the Mystic card game. From values and scoring to strategies.';

  // Structured data for number cards section
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": numberCards.slice(0, 10).map((card, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": `${language === 'de' ? 'Zahlenkarte' : 'Number Card'} ${card.id}`,
      "description": language === 'de' 
        ? `Karte mit dem Wert ${card.id}` 
        : `Card with value ${card.id}`
    }))
  };

  return (
    <div className="space-y-6">
      <SEO 
        title={title}
        description={description}
        type="article" 
        structuredData={structuredData}
      />
      <NumberCardsScoring />
      <NumberCardsView cards={numberCards} />
    </div>
  );
};

export default NumberCardsRoute;
