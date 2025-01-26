import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import Image from "@/components/ui/image";

type HeroContent = Database['public']['Tables']['cms_content']['Row'] & {
  cms_translations: Array<Database['public']['Tables']['cms_translations']['Row']>;
};

export const Hero = () => {
  const { t, language } = useLanguage();

  const { data: heroContent } = useQuery({
    queryKey: ["cms-content", "product", language],
    queryFn: async () => {
      const { data, error }: PostgrestSingleResponse<HeroContent> = await supabase
        .from("cms_content")
        .select(`
          *,
          cms_translations (*)
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
    return content.cms_translations.find(t => t.language === language);
  };

  const translatedHero = getTranslatedContent(heroContent);

  return (
    <section 
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/lovable-uploads/a426b83e-7fa7-4d7c-a3b5-b6492a302b41.png')",
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
        <Image 
          src="/lovable-uploads/c2532bcb-8d98-48b1-8d8f-d8ce6084c83f.png"
          alt="MYSTIC"
          className="w-full max-w-lg mx-auto mb-6"
        />
        <div 
          className="text-xl mb-8 max-w-2xl mx-auto text-white/90"
          dangerouslySetInnerHTML={{
            __html: translatedHero?.description || t('home.subtitle')
          }}
        />
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
  );
};