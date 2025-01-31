import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const GermanFlag = () => (
  <svg viewBox="0 0 640 480" className="h-full w-full">
    <path fill="#ffce00" d="M0 320h640v160H0z"/>
    <path d="M0 0h640v160H0z"/>
    <path fill="#d00" d="M0 160h640v160H0z"/>
  </svg>
);

const BritishFlag = () => (
  <svg viewBox="0 0 640 480" className="h-full w-full">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
  </svg>
);

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
      className="relative group"
    >
      <div className="h-5 w-5">
        {language === 'de' ? <BritishFlag /> : <GermanFlag />}
      </div>
      <span className="sr-only">
        {language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
      </span>
      <div className="absolute hidden group-hover:block bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-black/80 rounded">
        {language === 'de' ? (
          <span className="flex items-center gap-1">
            <div className="h-3 w-3">
              <BritishFlag />
            </div>
            EN
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <div className="h-3 w-3">
              <GermanFlag />
            </div>
            DE
          </span>
        )}
      </div>
    </Button>
  );
};