import { useLocation } from "react-router-dom";
import { Home, Book, PlayCircle, ShoppingBag } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Regeln", url: "/rules", icon: Book },
    { name: "Spielen", url: "/game", icon: PlayCircle },
    { name: "Shop", url: "/shop", icon: ShoppingBag },
  ];

  return <NavBar items={navItems} />;
};