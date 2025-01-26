import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full py-4 mt-auto bg-black/20 backdrop-blur-sm border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <Link 
            to="/impressum" 
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Impressum
          </Link>
        </div>
      </div>
    </footer>
  );
};