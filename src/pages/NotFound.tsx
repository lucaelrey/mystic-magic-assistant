import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-24 text-center flex-1">
        <h1 className="text-4xl font-bold mb-4">
          {language === 'de' ? '404 - Seite nicht gefunden' : '404 - Page Not Found'}
        </h1>
        <p className="mb-8">
          {language === 'de' 
            ? 'Die angeforderte Seite konnte nicht gefunden werden.' 
            : 'The requested page could not be found.'}
        </p>
        <Link 
          to="/"
          className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;