import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const ProductDescription = () => {
  const { language } = useLanguage();
  
  return (
    <div className="prose prose-lg prose-invert max-w-none text-left">
      <div className="space-y-4 md:space-y-6 text-white/80">
        <p className="text-base md:text-lg leading-relaxed">
          {language === 'en' ? 
            "Dive into the magical world of Mystic – the captivating card game that combines strategy, memory, and imagination." :
            "Tauche ein in die magische Welt von Mystara – mit dem fesselnden Kartenspiel MYSTIC, das Strategie, Gedächtnis und Fantasie vereint."}
        </p>
        <p className="text-base md:text-lg leading-relaxed">
          {language === 'en' ? 
            "Your cards are hidden, their values concealed – only those who maintain oversight and plan their moves wisely can triumph. Discover the magical elements, thwart your opponents' plans, and skillfully reduce your points. But beware: the game can turn with every move!" :
            "Deine Karten sind verdeckt, ihre Werte verborgen – nur wer den Überblick behält und seine Züge klug plant, kann triumphieren. Entdecke die magischen Elemente, durchkreuze die Pläne deiner Gegner und reduziere geschickt deine Punkte. Doch Vorsicht: Mit jedem Zug kann sich das Blatt wenden!"}
        </p>

        <div className="space-y-2">
          <h3 className="font-semibold text-white/90">
            {language === 'en' ? "Game Contents:" : "Inhalt des Spiels:"}
          </h3>
          <ul className="list-none space-y-3">
            <li className="flex items-start pl-4">
              <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
              <span className="text-sm md:text-base">
                {language === 'en' ? 
                  "110 high-quality playing cards with breathtaking design that bring the elements and actions of MYSTIC to life." :
                  "110 hochwertige Spielkarten mit atemberaubendem Design, die die Elemente und Aktionen von MYSTIC zum Leben erwecken."}
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-white/90">
            {language === 'en' ? "Facts:" : "Fakten:"}
          </h3>
          <ul className="list-none space-y-3">
            <li className="flex items-start pl-4">
              <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
              <span className="text-sm md:text-base">
                {language === 'en' ? "Number of players: 2-6 players" : "Spieleranzahl: 2–6 Spieler"}
              </span>
            </li>
            <li className="flex items-start pl-4">
              <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
              <span className="text-sm md:text-base">
                {language === 'en' ? "Age: Recommended for ages 12 and up" : "Alter: Empfohlen ab 12 Jahren"}
              </span>
            </li>
            <li className="flex items-start pl-4">
              <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
              <span className="text-sm md:text-base">
                {language === 'en' ? "Playing time: 20-40 minutes" : "Spieldauer: 20–40 Minuten"}
              </span>
            </li>
          </ul>
        </div>

        <p className="text-base md:text-lg leading-relaxed">
          <Link to="/rules" className="text-primary hover:text-primary/80 transition-colors">
            {language === 'en' ? 
              "Online Game Rules: A detailed guide with rules and card explanations is available online." :
              "Online-Spielanleitung: Eine ausführliche Anleitung mit Regeln und Kartenerklärungen steht online zur Verfügung."}
          </Link>
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          {language === 'en' ? 
            "Experience exciting game nights full of tactics and surprises with MYSTIC and immerse yourself in the mysterious world of Mystara!" :
            "Erlebe spannende Spieleabende voller Taktik und Überraschungen mit MYSTIC und tauche ein in die geheimnisvolle Welt von Mystara!"}
        </p>
      </div>
    </div>
  );
};