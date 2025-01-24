import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section mit Kristall-Bild und Sparkles */}
        <section 
          className="relative h-screen flex items-center justify-center"
          style={{
            backgroundImage: "url('/lovable-uploads/8581ee81-b1a9-48a5-b204-58b6126cc464.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          {/* Dunkler Overlay für bessere Lesbarkeit */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Sparkles Effect */}
          <div className="absolute inset-0">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={70}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={0.5}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-6xl font-bold mb-6 text-white">
              {t('home.welcome')}
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              {t('home.subtitle')}
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/shop">
                <Button className="glass-button">
                  {t('home.buyNow')}
                </Button>
              </Link>
              <Link to="/rules">
                <Button className="glass-button">
                  {t('home.viewRules')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;