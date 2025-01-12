import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="glass-nav">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/7be60b9e-74ab-4aac-8467-80a677c66606.png" 
              alt="Mystic Crystal Logo" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-primary">Mystic</span>
          </Link>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/rules" className="hover:text-primary transition-colors">
              Rules
            </Link>
            <Link to="/game" className="hover:text-primary transition-colors">
              Game
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}