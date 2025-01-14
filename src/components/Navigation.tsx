import { useLocation } from "react-router-dom";
import { Home, Book, PlayCircle, ShoppingBag } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export const Navigation = () => {
  const location = useLocation();

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

  const navItems = [
    { name: "Home", url: "/", icon: Home, isActive: isPathActive("/") },
    { name: "Regeln", url: "/rules", icon: Book, isActive: isPathActive("/rules") },
    { name: "Shop", url: "/shop", icon: ShoppingBag, isActive: isPathActive("/shop") },
    { 
      name: "Spielen", 
      url: "https://play.mysticgame.ch", 
      icon: PlayCircle, 
      isActive: false 
    },
  ];

  return <NavBar items={navItems} />;
};