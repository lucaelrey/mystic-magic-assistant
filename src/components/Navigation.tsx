import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Book, PlayCircle, ShoppingBag } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="glass-nav">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button
                variant="ghost"
                className={cn(
                  "gap-2",
                  isActive("/") && "bg-primary/20 text-primary"
                )}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link to="/rules">
              <Button
                variant="ghost"
                className={cn(
                  "gap-2",
                  isActive("/rules") && "bg-primary/20 text-primary"
                )}
              >
                <Book className="h-4 w-4" />
                <span>Regeln</span>
              </Button>
            </Link>
            <Link to="/game">
              <Button
                variant="ghost"
                className={cn(
                  "gap-2",
                  isActive("/game") && "bg-primary/20 text-primary"
                )}
              >
                <PlayCircle className="h-4 w-4" />
                <span>Spielen</span>
              </Button>
            </Link>
            <Link to="/shop">
              <Button
                variant="ghost"
                className={cn(
                  "gap-2",
                  isActive("/shop") && "bg-primary/20 text-primary"
                )}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Shop</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};