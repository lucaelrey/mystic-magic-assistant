import { useLocation } from "react-router-dom";
import { Home, Book, PlayCircle, ShoppingBag } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export const Navigation = () => {
  const location = useLocation();

  // Funktion zum Überprüfen, ob ein Pfad aktiv ist
  const isPathActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: "Home", url: "/", icon: Home, isActive: isPathActive("/") },
    { name: "Regeln", url: "/rules", icon: Book, isActive: isPathActive("/rules") },
    { name: "Spielen", url: "/game", icon: PlayCircle, isActive: isPathActive("/game") },
    { name: "Shop", url: "/shop", icon: ShoppingBag, isActive: isPathActive("/shop") },
  ];

  return <NavBar items={navItems} />;
};