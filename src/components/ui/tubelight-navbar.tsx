import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface NavBarProps {
  items: {
    name: string;
    url: string;
    icon: React.ElementType | React.FC;
    isActive: boolean;
  }[];
}

export function NavBar({ items }: NavBarProps) {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center justify-between space-x-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.url}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                  item.isActive ? "text-foreground" : "text-foreground/60"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}