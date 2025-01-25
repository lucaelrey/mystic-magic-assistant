import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface TubelightNavbarProps {
  items: {
    href: string;
    title: string;
  }[];
}

export function TubelightNavbar({ items }: TubelightNavbarProps) {
  const location = useLocation();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center justify-center gap-2 md:gap-6">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-4",
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                <div className="relative">
                  {item.title}
                  {location.pathname === item.href && (
                    <div className="absolute bottom-0 left-0 right-0 -mb-[20px] h-[2px] bg-foreground" />
                  )}
                </div>
              </Link>
            ))}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}