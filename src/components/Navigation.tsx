import { useLocation, Link } from "react-router-dom";
import { Book, PlayCircle, ShoppingBag } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "@/components/ui/image";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType | React.FC;
  isActive: boolean;
}

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-16">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <Image 
                src="/lovable-uploads/acaea78e-8d8d-4aff-848d-48e80bd5061a.png" 
                alt="Crystal Home"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
              />
            </Link>
          </div>

          {/* Navigation items section */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                className={`flex flex-col items-center sm:flex-row sm:space-x-2 
                  text-xs sm:text-sm font-medium transition-colors
                  ${item.isActive 
                    ? 'text-white' 
                    : 'text-white/70 hover:text-white'
                  }`}
              >
                <item.icon className="w-5 h-5 sm:w-4 sm:h-4 mb-1 sm:mb-0" />
                <span className="text-[11px] sm:text-xs md:text-sm">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Language switcher section */}
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};