import { Home, Frown } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="glass-card max-w-2xl w-full p-8 flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-4">
          <Frown className="w-12 h-12 text-white/80" />
          <h1 className="text-4xl font-bold">404</h1>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Seite nicht gefunden</h2>
          <p className="text-white/80">
            Tut uns leid, aber die gesuchte Seite existiert nicht oder wurde verschoben.
          </p>
        </div>

        <Link 
          to="/" 
          className="glass-button flex items-center gap-2 mt-4"
        >
          <Home className="w-4 h-4" />
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
};

export default NotFound;