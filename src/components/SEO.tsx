
import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
  title: string;
  description: string;
  type?: "website" | "article" | "product";
  image?: string;
  structuredData?: Record<string, any>;
  children?: React.ReactNode;
}

export const SEO = ({
  title,
  description,
  type = "website",
  image = "/lovable-uploads/crystal-of-mystara.webp",
  structuredData,
  children,
}: SEOProps) => {
  const { language } = useLanguage();
  const currentUrl = window.location.pathname;
  const baseUrl = "https://mystic-game.ch";
  const fullUrl = `${baseUrl}${currentUrl}`;
  
  // Create alternate language URLs
  const alternateEN = currentUrl.replace(`/${language}/`, '/en/').replace(/^\/rules/, '/en/rules');
  const alternateDE = currentUrl.replace(`/${language}/`, '/de/').replace(/^\/rules/, '/de/rules');

  return (
    <Helmet>
      {/* Basic tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:locale" content={language === "en" ? "en_US" : "de_CH"} />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />
      
      {/* Canonical and language alternates */}
      <link rel="canonical" href={fullUrl} />
      {language === "en" && <link rel="alternate" hrefLang="de" href={`${baseUrl}${alternateDE}`} />}
      {language === "de" && <link rel="alternate" hrefLang="en" href={`${baseUrl}${alternateEN}`} />}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${alternateEN}`} />
      
      {/* Structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {children}
    </Helmet>
  );
};
