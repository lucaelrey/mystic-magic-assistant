import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type HeroContent = Database['public']['Tables']['cms_content']['Row'] & {
  translations: Array<Database['public']['Tables']['cms_translations']['Row']>;
};

const Index = () => {
  const { t, language } = useLanguage();

  const { data: heroContent } = useQuery({
    queryKey: ["cms-content", "product", language],
    queryFn: async () => {
      const { data, error }: PostgrestSingleResponse<HeroContent> = await supabase
        .from("cms_content")
        .select(`
          *,
          translations (*)
        `)
        .eq("type", "product")
        .eq("key", "hero")
        .eq("published", true)
        .single();

      if (error) {
        console.error("Error fetching hero content:", error);
        return null;
      }

      return data;
    },
  });

  const getTranslatedContent = (content: HeroContent | null) => {
    if (!content) return null;
    return content.translations.find(t => t.language === language);
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