
import React from "react";
import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { RulesHeader } from "@/components/rules/RulesHeader";
import { RulesTabs } from "@/components/rules/RulesTabs";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Rules = () => {
  const { language, t } = useLanguage();
  
  // Define SEO content based on language
  const title = language === "de" 
    ? "Spielregeln | Mystic Kartenspiel - Strategie und Mystik"
    : "Game Rules | Mystic Card Game - Strategy and Mysticism";
    
  const description = language === "de"
    ? "Entdecken Sie die offiziellen Spielregeln des Mystic Kartenspiels. Lernen Sie Zahlenkarten, Aktionskarten und Strategien für 2-6 Spieler."
    : "Discover the official game rules of the Mystic card game. Learn about number cards, action cards, and strategies for 2-6 players.";
  
  // Create structured data for the game rules
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "totalTime": "PT10M",
    "step": [
      {
        "@type": "HowToStep",
        "name": language === "de" ? "Spielvorbereitung" : "Game Preparation",
        "text": language === "de" 
          ? "Jeder Spieler erhält 4-6 Karten, der Rest bildet den Nachziehstapel."
          : "Each player receives 4-6 cards, the rest forms the draw pile."
      },
      {
        "@type": "HowToStep",
        "name": language === "de" ? "Spielverlauf" : "Gameplay",
        "text": language === "de"
          ? "Ziehen Sie eine Karte oder tauschen Sie mit dem Ablagestapel."
          : "Draw a card or exchange with the discard pile."
      },
      {
        "@type": "HowToStep",
        "name": language === "de" ? "Spielende" : "Game End",
        "text": language === "de"
          ? "Das Spiel endet, wenn ein Spieler 'Ende' ruft."
          : "The game ends when a player calls 'End'."
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": language === "de" ? "Mystic Kartenspiel" : "Mystic Card Game"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={title} 
        description={description} 
        type="article"
        image="/lovable-uploads/crystal-of-mystara-header.webp"
        structuredData={structuredData}
      />
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24">
        <RulesHeader />
        <RulesTabs />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Rules;
