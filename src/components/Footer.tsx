import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const footerClassName = isHomePage
    ? "fixed bottom-0 left-0 right-0 z-50 py-4 bg-black/20 backdrop-blur-md border-t border-white/5"
    : "mt-8 py-4 bg-black/20 backdrop-blur-md border-t border-white/5";

  return (
    <footer className={footerClassName}>
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