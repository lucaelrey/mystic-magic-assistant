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
                <div className="space-y-4 md:space-y-6 text-white/80">
                  <p className="text-base md:text-lg leading-relaxed">
                    Tauche ein in die magische Welt von Mystic Cards – dem fesselnden Kartenspiel, 
                    das Strategie, Gedächtnis und Fantasie vereint.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Deine Karten sind verdeckt, ihre Werte verborgen – nur wer den Überblick behält 
                    und seine Züge klug plant, kann triumphieren. Entdecke die magischen Elemente, 
                    durchkreuze die Pläne deiner Gegner und reduziere geschickt deine Punkte. 
                    Doch Vorsicht: Mit jedem Zug kann sich das Spiel wenden!
                  </p>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-white/90">Inhalt des Spiels:</h3>
                    <ul className="list-none space-y-3">
                      <li className="flex items-center pl-4">
                        <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                          bg-white/40 rounded-full mr-2 md:mr-3" />
                        <span className="text-sm md:text-base">
                          110 hochwertige Spielkarten mit atemberaubendem Design, die Elemente 
                          und Aktionen zum Leben erwecken.
                        </span>
                      </li>
                      <li className="flex items-center pl-4">
                        <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                          bg-white/40 rounded-full mr-2 md:mr-3" />
                        <span className="text-sm md:text-base">
                          Hochwertige Verpackung: Eine robuste und stilvolle Schachtel aus Karton, 
                          perfekt für sichere Aufbewahrung und unterwegs.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-white/90">Fakten:</h3>
                    <ul className="list-none space-y-3">
                      <li className="flex items-center pl-4">
                        <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                          bg-white/40 rounded-full mr-2 md:mr-3" />
                        <span className="text-sm md:text-base">Spieleranzahl: 2–6 Spieler</span>
                      </li>
                      <li className="flex items-center pl-4">
                        <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                          bg-white/40 rounded-full mr-2 md:mr-3" />
                        <span className="text-sm md:text-base">Alter: Ab 12 Jahren</span>
                      </li>
                      <li className="flex items-center pl-4">
                        <span className="inline-block w-1.5 md:w-2 h-1.5 md:h-2 
                          bg-white/40 rounded-full mr-2 md:mr-3" />
                        <span className="text-sm md:text-base">Spieldauer: 20–40 Minuten</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-base md:text-lg leading-relaxed">
                    Online Spielanleitung: Eine ausführliche Anleitung mit Regeln und 
                    Kartenerklärungen steht online zur Verfügung.
                  </p>

                  <p className="text-base md:text-lg leading-relaxed">
                    Erlebe spannende Spieleabende voller Taktik und Überraschungen mit 
                    Mystic Cards und tauche ein in die geheimnisvolle Welt von Mystara!
                  </p>
                </div>
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
                    border border-white/20 hover:border-white/30
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