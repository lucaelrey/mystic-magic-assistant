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
      <main className="container mx-auto px-4 pt-24 md:pt-32 pb-16">
        <Card className="glass-card max-w-7xl mx-auto overflow-visible">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 p-6 md:p-12">
            {/* Product Image */}
            <div className="relative aspect-square order-first group">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/lovable-uploads/cf7eccbe-9b33-4e52-aadf-a9bf531ba57b.png"
                  alt="Mystic Kartenspiel Box"
                  className="w-full h-full object-contain rounded-2xl 
                    transition-transform duration-300 group-hover:scale-105
                    shadow-xl"
                />
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-8 md:space-y-10">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white to-white/70 leading-tight">
                  MYSTIC - Das Kartenspiel
                </h1>
                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-white/90 to-white/70">
                  24.90 CHF
                </div>
              </div>

              {/* Purchase Module */}
              <div className="space-y-6 bg-black/20 backdrop-blur-lg 
                p-6 md:p-8 rounded-2xl border border-white/20 
                shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-6">
                  <span className="text-lg font-medium text-white/90 min-w-24">
                    Anzahl:
                  </span>
                  <div className="w-40">
                    <Input 
                      value={quantity} 
                      onChange={setQuantity} 
                      min={1} 
                      max={10}
                      className="h-12 shadow-xl ring-white/30 
                        hover:ring-white/40 focus-within:ring-primary/50"
                    />
                  </div>
                </div>
                <Button 
                  className="w-full h-14 text-lg font-semibold 
                    rounded-xl
                    border border-white/20 hover:border-white/30
                    transition-all duration-300 ease-out
                    hover:scale-[1.02]
                    bg-gradient-to-r from-white/20 to-white/10 
                    hover:from-white/30 hover:to-white/20
                    group"
                  onClick={handlePurchase}
                >
                  <ShoppingCart className="w-6 h-6 mr-3 
                    transition-transform duration-300 group-hover:scale-110" />
                  Jetzt kaufen
                </Button>
                <p className="text-sm font-medium text-center text-white/60">
                  Sichere Bezahlung mit SSL-Verschlüsselung
                </p>
              </div>
              
              {/* Product Description */}
              <div className="prose prose-lg prose-invert">
                <div className="space-y-6 text-white/80">
                  <p className="text-lg leading-relaxed">
                    Tauche ein in die magische Welt von Mystic Cards – dem fesselnden Kartenspiel, 
                    das Strategie, Gedächtnis und Fantasie vereint.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Deine Karten sind verdeckt, ihre Werte verborgen – nur wer den Überblick behält 
                    und seine Züge klug plant, kann triumphieren. Entdecke die magischen Elemente, 
                    durchkreuze die Pläne deiner Gegner und reduziere geschickt deine Punkte. 
                    Doch Vorsicht: Mit jedem Zug kann sich das Spiel wenden!
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white/90">Inhalt des Spiels:</h3>
                    <ul className="list-none space-y-3">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-white/40 rounded-full" />
                        <span>
                          110 hochwertige Spielkarten mit atemberaubendem Design, die Elemente 
                          und Aktionen zum Leben erwecken.
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-white/40 rounded-full" />
                        <span>
                          Hochwertige Verpackung: Eine robuste und stilvolle Schachtel aus Karton, 
                          perfekt für sichere Aufbewahrung und unterwegs.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white/90">Fakten:</h3>
                    <ul className="list-none space-y-3">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-white/40 rounded-full" />
                        <span>Spieleranzahl: 2–6 Spieler</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-white/40 rounded-full" />
                        <span>Alter: Ab 12 Jahren</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-white/40 rounded-full" />
                        <span>Spieldauer: 20–40 Minuten</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-lg leading-relaxed">
                    Online Spielanleitung: Eine ausführliche Anleitung mit Regeln und 
                    Kartenerklärungen steht online zur Verfügung.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Erlebe spannende Spieleabende voller Taktik und Überraschungen mit 
                    Mystic Cards und tauche ein in die geheimnisvolle Welt von Mystara!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Shop;