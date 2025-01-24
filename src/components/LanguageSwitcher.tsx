import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
      className="relative group"
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">
        Switch to {language === 'de' ? 'English' : 'Deutsch'}
      </span>
      <div className="absolute hidden group-hover:block bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-black/80 rounded">
        {language === 'de' ? 'EN' : 'DE'}
      </div>
    </Button>
  );
};