
import React from "react";
import { ActionCardsRules } from "./ActionCardsRules";
import { ActionCardGrid } from "./ActionCardGrid";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";

const ActionCardsView = () => {
  const { language } = useLanguage();

  const title = language === 'de' 
    ? 'Aktionskarten - Mystic Kartenspiel Regeln'
    : 'Action Cards - Mystic Card Game Rules';
  
  const description = language === 'de'
    ? 'Entdecken Sie die Aktionskarten von Mystic. Lernen Sie die speziellen Fähigkeiten und strategischen Möglichkeiten jeder Karte kennen.'
    : 'Discover Mystic\'s action cards. Learn about the special abilities and strategic options each card provides.';

  // Structured data for action cards section
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": language === 'de' ? "Schutz" : "Shield",
        "description": language === 'de' 
          ? "Schützt einen Spieler vor Aktionskarten" 
          : "Protects a player from action cards"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": language === 'de' ? "Tausch" : "Swap",
        "description": language === 'de' 
          ? "Tausche Karten mit anderen Spielern" 
          : "Exchange cards with other players"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": language === 'de' ? "Enthüllen" : "Reveal",
        "description": language === 'de' 
          ? "Decke Karten anderer Spieler auf" 
          : "Reveal other players' cards"
      }
    ]
  };

  return (
    <>
      <SEO 
        title={title}
        description={description}
        type="article"
        image="/lovable-uploads/shuffle.webp"
        structuredData={structuredData}
      />
      <main className="space-y-6">
        <h1 className="sr-only">{title}</h1>
        <ActionCardsRules />
        <ActionCardGrid />
      </main>
    </>
  );
};

export default ActionCardsView;
