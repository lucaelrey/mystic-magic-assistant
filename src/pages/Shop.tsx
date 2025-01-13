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
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="glass-card max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  Mystic Grundspiel
                </h1>
                <div className="text-3xl font-bold">29.99 CHF</div>
              </div>
              
              <div className="prose prose-lg">
                <p className="text-muted-foreground">
                  Tauche ein in die mystische Welt von Mystic - dem fesselnden Kartenspiel, 
                  das Strategie und Magie vereint. Das Grundspiel enthält alles, was du für 
                  spannende Spieleabende brauchst:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>120 hochwertige Spielkarten</li>
                  <li>Ausführliche Spielanleitung</li>
                  <li>4 Übersichtskarten</li>
                  <li>Sammlerbox mit Magnetverschluss</li>
                  <li>Exklusive Erstauflage-Bonuskarte</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium">Anzahl:</span>
                  <Input 
                    value={quantity} 
                    onChange={setQuantity} 
                    min={1} 
                    max={10}
                  />
                </div>
                <Button 
                  className="glass-button w-full text-lg py-6"
                  onClick={handlePurchase}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Jetzt kaufen
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Kostenloser Versand • 30 Tage Rückgaberecht • Sichere Bezahlung
                </p>
              </div>
            </div>

            <div className="relative h-[400px] md:h-full">
              <div 
                className="absolute inset-0 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <img
                  src="/placeholder.svg"
                  alt="Mystic Grundspiel"
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Shop;