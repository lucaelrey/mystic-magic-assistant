import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="container flex h-16 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

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

          {/* Language Switcher - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 bg-background/95 backdrop-blur-sm border-b border-border/40 md:hidden",
          "transition-all duration-300 ease-in-out",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="container px-4 py-4 flex flex-col gap-4">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.url}
              target={item.url.startsWith('http') ? '_blank' : undefined}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                "hover:bg-white/10",
                item.isActive ? "text-white bg-white/10" : "text-white/60"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
          
          {/* Language Switcher - Mobile */}
          <div className="px-3 py-2 mt-2 border-t border-border/40">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};