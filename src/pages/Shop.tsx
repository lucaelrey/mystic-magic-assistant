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
    navigate('/cart', { state: { quantity } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navigation />
      <main className="container mx-auto px-4 pt-20 md:pt-24 pb-12">
        <Card className="glass-card max-w-6xl mx-auto overflow-visible">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8">
            {/* Product Image */}
            <div className="relative aspect-square order-first group">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/lovable-uploads/cf7eccbe-9b33-4e52-aadf-a9bf531ba57b.png"
                  alt="Mystic Kartenspiel Box"
                  className="w-full h-full object-contain rounded-xl md:rounded-2xl 
                    transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-6 md:space-y-8 order-last">
              <div className="space-y-2 md:space-y-4">
                <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white to-white/70">
                  MYSTIC - Das Kartenspiel
                </h1>
                <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white/90 to-white/70">
                  24.90 CHF
                </div>
              </div>
              
              <div className="prose prose-lg prose-invert">
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  Tauche ein in die mystische Welt von Mystic - dem fesselnden Kartenspiel, 
                  das Strategie und Magie vereint. Das Grundspiel enthält alles, was du für 
                  spannende Spieleabende brauchst:
                </p>
                
                <ul className="list-none space-y-2 md:space-y-3 mt-4 md:mt-6">
                  {[
                    "120 hochwertige Spielkarten",
                    "Ausführliche Spielanleitung",
                    "4 Übersichtskarten",
                    "Sammlerbox mit Magnetverschluss",
                    "Exklusive Erstauflage-Bonuskarte"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-white/80 pl-4">
                      <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                        bg-white/40 rounded-full mr-2 md:mr-3" />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 md:space-y-6 bg-black/20 backdrop-blur-lg 
                p-4 md:p-8 rounded-xl md:rounded-2xl border border-white/20 
                shadow-lg md:shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                  <span className="hidden md:inline text-base md:text-lg font-medium text-white/90 
                    min-w-20 md:min-w-24">
                    Anzahl:
                  </span>
                  <div className="w-full md:w-32 mx-auto md:mx-0">
                    <Input 
                      value={quantity} 
                      onChange={setQuantity} 
                      min={1} 
                      max={10}
                      className="h-12 md:h-12 shadow-lg ring-white/30 
                        hover:ring-white/40 focus-within:ring-primary/50
                        w-48 mx-auto"
                    />
                  </div>
                </div>
                <Button 
                  className="w-full h-12 md:h-14 text-base md:text-lg font-semibold 
                    rounded-lg md:rounded-xl
                    bg-gradient-to-r from-white/20 to-white/10 
                    hover:from-white/30 hover:to-white/20
                    border border-white/20 hover:border-white/30
                    shadow-lg hover:shadow-xl
                    backdrop-blur-lg
                    transition-all duration-300 ease-out
                    hover:scale-[1.02]
                    group"
                  onClick={handlePurchase}
                >
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 
                    transition-transform duration-300 group-hover:scale-110" />
                  Jetzt kaufen
                </Button>
                <p className="text-xs md:text-sm font-medium text-center text-white/60">
                  Sichere Bezahlung mit SSL-Verschlüsselung
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