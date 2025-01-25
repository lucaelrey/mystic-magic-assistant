import { Link } from "react-router-dom";

interface ProductDescriptionProps {
  description: string;
  content: {
    players?: string;
    age?: string;
    duration?: string;
    contents?: string[];
  };
}

export const ProductDescription = ({ description, content }: ProductDescriptionProps) => {
  return (
    <div className="prose prose-lg prose-invert max-w-none text-left">
      <div className="space-y-4 md:space-y-6 text-white/80">
        <div dangerouslySetInnerHTML={{ __html: description }} />

        {content.contents && content.contents.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-white/90">Inhalt des Spiels:</h3>
            <ul className="list-none space-y-3">
              {content.contents.map((item, index) => (
                <li key={index} className="flex items-start pl-4">
                  <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                    bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-semibold text-white/90">Fakten:</h3>
          <ul className="list-none space-y-3">
            {content.players && (
              <li className="flex items-start pl-4">
                <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                  bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
                <span className="text-sm md:text-base">
                  Spieleranzahl: {content.players}
                </span>
              </li>
            )}
            {content.age && (
              <li className="flex items-start pl-4">
                <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                  bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
                <span className="text-sm md:text-base">
                  Alter: {content.age}
                </span>
              </li>
            )}
            {content.duration && (
              <li className="flex items-start pl-4">
                <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                  bg-white/40 rounded-full mr-2 md:mr-3 mt-2" />
                <span className="text-sm md:text-base">
                  Spieldauer: {content.duration}
                </span>
              </li>
            )}
          </ul>
        </div>

        <p className="text-base md:text-lg leading-relaxed">
          <Link to="/rules" className="text-primary hover:text-primary/80 transition-colors">
            Online Spielanleitung: Eine ausführliche Anleitung mit Regeln und 
            Kartenerklärungen steht online zur Verfügung.
          </Link>
        </p>
      </div>
    </div>
  );
};