import { Home, Frown } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 
        hover:border-white/20 rounded-xl shadow-lg p-8 
        max-w-2xl w-full flex flex-col items-center gap-6 text-center
        transition-all duration-300">
        <div className="flex items-center gap-4">
          <Frown className="w-12 h-12 text-white/80" />
          <h1 className="text-4xl font-bold text-white">404</h1>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">Seite nicht gefunden</h2>
          <p className="text-white/80">
            Tut uns leid, aber die gesuchte Seite existiert nicht oder wurde verschoben.
          </p>
        </div>

        <Link 
          to="/" 
          className="flex items-center gap-2 mt-4 px-6 py-3 
            rounded-lg bg-white/10 hover:bg-white/15 
            border border-white/20 hover:border-white/30
            text-white transition-all duration-300
            hover:scale-105"
        >
          <Home className="w-4 h-4" />
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
};

export default NotFound;