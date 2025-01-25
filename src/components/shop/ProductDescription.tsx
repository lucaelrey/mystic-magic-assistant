import { Link } from "react-router-dom";

export const ProductDescription = () => {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-left">
      <div className="space-y-4 md:space-y-6 text-white/80">
        <p className="text-base md:text-lg leading-relaxed">
          Tauche ein in die magische Welt von Mystic Cards – dem fesselnden Kartenspiel, 
          das Strategie, Gedächtnis und Fantasie vereint.
        </p>
        <p className="text-base md:text-lg leading-relaxed">
          Deine Karten sind verdeckt, ihre Werte verborgen – nur wer den Überblick behält 
          und seine Züge klug plant, kann triumphieren. Entdecke die magischen Elemente, 
          durchkreuze die Pläne deiner Gegner und reduziere geschickt deine Punkte. 
          Doch Vorsicht: Mit jedem Zug kann sich das Spiel wenden!
        </p>

        <div className="space-y-2">
          <h3 className="font-semibold text-white/90">Inhalt des Spiels:</h3>
          <ul className="list-none space-y-3">
            <li className="flex items-start pl-4">
              <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
              <span className="text-sm md:text-base">
                110 hochwertige Spielkarten mit atemberaubendem Design, die Elemente 
                und Aktionen zum Leben erwecken.
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-white/90">Fakten:</h3>
          <ul className="list-none space-y-3">
            <li className="flex items-start pl-4">
              <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
              <span className="text-sm md:text-base">Spieleranzahl: 2–6 Spieler</span>
            </li>
            <li className="flex items-start pl-4">
              <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
              <span className="text-sm md:text-base">Alter: Ab 12 Jahren</span>
            </li>
            <li className="flex items-start pl-4">
              <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
              <span className="text-sm md:text-base">Spieldauer: 20–40 Minuten</span>
            </li>
          </ul>
        </div>

        <p className="text-base md:text-lg leading-relaxed">
          <Link to="/rules" className="text-primary hover:text-primary/80 transition-colors">
            Online Spielanleitung: Eine ausführliche Anleitung mit Regeln und 
            Kartenerklärungen steht online zur Verfügung.
          </Link>
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          Erlebe spannende Spieleabende voller Taktik und Überraschungen mit 
          Mystic Cards und tauche ein in die geheimnisvolle Welt von Mystara!
        </p>
      </div>
    </div>
  );
};