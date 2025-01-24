import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType;
  isActive: boolean;
}

interface NavBarProps {
  items: NavItem[];
}

export const NavBar = ({ items }: NavBarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="container flex h-16 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 md:gap-8">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                target={item.url.startsWith('http') ? '_blank' : undefined}
                className={cn(
                  "group relative px-3 py-2 text-sm font-medium transition-colors",
                  "hover:text-white/90",
                  item.isActive ? "text-white" : "text-white/60"
                )}
              >
                <div 
                  className="absolute inset-0 transform bg-white/10 rounded-lg transition-transform group-hover:scale-105" 
                  style={{ opacity: item.isActive ? 0.1 : 0 }} 
                />
                <div className="relative flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex-1 flex justify-around items-center">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                target={item.url.startsWith('http') ? '_blank' : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3",
                  "hover:text-white/90",
                  item.isActive ? "text-white" : "text-white/60"
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Language Switcher - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};