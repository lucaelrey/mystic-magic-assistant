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
            {/* Product Image */}
            <div className="relative aspect-square order-first">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/lovable-uploads/cf7eccbe-9b33-4e52-aadf-a9bf531ba57b.png"
                  alt="Mystic Kartenspiel Box"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-6 order-last">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  MYSTIC - Das Kartenspiel
                </h1>
                <div className="text-3xl font-bold">24.90 CHF</div>
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

              <div className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium min-w-20">Anzahl:</span>
                  <div className="w-24">
                    <Input 
                      value={quantity} 
                      onChange={setQuantity} 
                      min={1} 
                      max={10}
                      className="h-11"
                    />
                  </div>
                </div>
                <Button 
                  className="glass-button w-full text-lg py-6 rounded-xl hover:scale-[1.02] transition-all duration-300"
                  onClick={handlePurchase}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Jetzt kaufen
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Sichere Bezahlung
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Shop;