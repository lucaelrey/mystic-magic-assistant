import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Flag } from "lucide-react";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
      className="relative group"
    >
      <Flag className="h-5 w-5" />
      <span className="sr-only">
        {language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
      </span>
      <div className="absolute hidden group-hover:block bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-black/80 rounded">
        {language === 'de' ? (
          <span className="flex items-center gap-1">
            <Flag className="h-3 w-3" /> EN
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Flag className="h-3 w-3" /> DE
          </span>
        )}
      </div>
    </Button>
  );
};