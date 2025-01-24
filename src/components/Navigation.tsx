import { useLocation } from "react-router-dom";
import { Home, Book, PlayCircle, ShoppingBag } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType;
  isActive: boolean;
}

export const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  // Funktion zum Überprüfen, ob ein Pfad aktiv ist
  const isPathActive = (path: string) => {
    const currentPath = location.pathname;
    
    // Für die Hauptroute
    if (path === "/" && currentPath === "/") {
      return true;
    }
    
    // Für andere Routen
    if (path !== "/") {
      // Prüfe ob der aktuelle Pfad mit dem gegebenen Pfad beginnt
      return currentPath.startsWith(path);
    }
    
    return false;
  };

  const navItems: NavItem[] = [
    { 
      name: t('navigation.home').toString(), 
      url: "/", 
      icon: Home, 
      isActive: isPathActive("/") 
    },
    { 
      name: t('navigation.rules').toString(), 
      url: "/rules", 
      icon: Book, 
      isActive: isPathActive("/rules") 
    },
    { 
      name: t('navigation.shop').toString(), 
      url: "/shop", 
      icon: ShoppingBag, 
      isActive: isPathActive("/shop") 
    },
    { 
      name: "Spielen", 
      url: "https://play.mysticgame.ch", 
      icon: PlayCircle, 
      isActive: false 
    },
  ];

  return <NavBar items={navItems} />;
};