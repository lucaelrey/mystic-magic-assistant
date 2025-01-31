import React from "react";
import { Helmet } from "react-helmet";
import { ActionCardsRules } from "./ActionCardsRules";
import { ActionCardGrid } from "./ActionCardGrid";
import { useLanguage } from "@/contexts/LanguageContext";

const ActionCardsView = () => {
  const { language } = useLanguage();

  const title = language === 'de' 
    ? 'Aktionskarten - Mystic Kartenspiel Regeln'
    : 'Action Cards - Mystic Card Game Rules';
  
  const description = language === 'de'
    ? 'Entdecken Sie die Aktionskarten von Mystic. Lernen Sie die speziellen Fähigkeiten und strategischen Möglichkeiten jeder Karte kennen.'
    : 'Discover Mystic\'s action cards. Learn about the special abilities and strategic options each card provides.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://mystic-game.com/${language}/rules/action-cards`} />
        {language === 'de' && <link rel="alternate" hreflang="en" href="https://mystic-game.com/en/rules/action-cards" />}
        {language === 'en' && <link rel="alternate" hreflang="de" href="https://mystic-game.com/de/rules/action-cards" />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "articleSection": "Game Rules",
            "inLanguage": language,
            "isPartOf": {
              "@type": "WebSite",
              "name": "Mystic Card Game",
              "url": "https://mystic-game.com"
            }
          })}
        </script>
      </Helmet>
      <main className="space-y-6">
        <h1 className="sr-only">{title}</h1>
        <ActionCardsRules />
        <ActionCardGrid />
      </main>
    </>
  );
};

export default ActionCardsView;