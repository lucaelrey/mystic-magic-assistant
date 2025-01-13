import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/number-input";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Card className="glass-card max-w-4xl mx-auto overflow-hidden">
          {/* Product Image Section */}
          <div className="w-full aspect-[16/9] bg-gradient-to-b from-muted/50 to-background/50 relative">
            <img
              src="/placeholder.svg"
              alt="Mystic Grundspiel"
              className="w-full h-full object-contain p-8"
            />
          </div>

          {/* Product Details Section */}
          <div className="p-8 space-y-8">
            {/* Title and Price */}
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold text-foreground">
                Mystic Grundspiel
              </h1>
              <div className="text-3xl font-bold text-primary">29.99 €</div>
            </div>
            
            {/* Description */}
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground text-center">
                Tauche ein in die mystische Welt von Mystic - dem fesselnden Kartenspiel, 
                das Strategie und Magie vereint.
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Das Grundspiel enthält:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                    120 hochwertige Spielkarten
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                    Ausführliche Spielanleitung
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                    4 Übersichtskarten
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                    Sammlerbox mit Magnetverschluss
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                    Exklusive Erstauflage-Bonuskarte
                  </li>
                </ul>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <label className="text-lg font-medium text-foreground">Anzahl:</label>
                <Input 
                  value={quantity} 
                  onChange={setQuantity} 
                  min={1} 
                  max={10}
                />
              </div>
              
              <Button 
                className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handlePurchase}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Jetzt kaufen
              </Button>

              <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Kostenloser Versand
                </div>
                <div>30 Tage Rückgaberecht</div>
                <div>Sichere Bezahlung</div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Shop;