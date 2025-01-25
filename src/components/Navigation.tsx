import { useLocation } from "react-router-dom";
import { Book, PlayCircle, ShoppingBag } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "@/components/ui/image";

interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType | React.FC;
  isActive: boolean;
}

// Custom Home icon component using the crystal image
const CrystalHomeIcon: React.FC = () => (
  <Image 
    src="/lovable-uploads/acaea78e-8d8d-4aff-848d-48e80bd5061a.png" 
    alt="Crystal Home"
    className="w-10 h-10 object-contain"
  />
);

export const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const isPathActive = (path: string) => {
    const currentPath = location.pathname;
    
    if (path === "/" && currentPath === "/") {
      return true;
    }
    
    if (path !== "/") {
      return currentPath.startsWith(path);
    }
    
    return false;
  };

  const navItems: NavItem[] = [
    { 
      name: "", 
      url: "/", 
      icon: CrystalHomeIcon,
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
      name: "Assistant",
      url: "https://play.mysticgame.ch", 
      icon: PlayCircle, 
      isActive: false 
    },
  ];

  return <NavBar items={navItems} />;
};