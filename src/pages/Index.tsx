import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CMSContent {
  id: string;
  type: string;
  key: string;
  published: boolean;
  translations: {
    language: string;
    title: string;
    description: string;
    content: any;
  }[];
}

const Index = () => {
  const { t, currentLanguage } = useLanguage();

  const { data: heroContent } = useQuery({
    queryKey: ["cms-content", "hero", currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_content")
        .select(`
          *,
          translations (
            language,
            title,
            description,
            content
          )
        `)
        .eq("type", "hero")
        .eq("key", "main")
        .eq("published", true)
        .single();

      if (error) {
        console.error("Error fetching hero content:", error);
        return null;
      }

      return data as CMSContent;
    },
  });

  const getTranslatedContent = (content: CMSContent | null) => {
    if (!content) return null;
    return content.translations.find(t => t.language === currentLanguage);
  };

  const translatedHero = getTranslatedContent(heroContent);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section 
          className="relative h-screen flex items-center justify-center"
          style={{
            backgroundImage: "url('/lovable-uploads/8581ee81-b1a9-48a5-b204-58b6126cc464.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          
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
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-6xl font-bold mb-6 text-white">
              {translatedHero?.title || t('home.welcome')}
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              {translatedHero?.description || t('home.subtitle')}
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