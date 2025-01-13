import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="glass-card max-w-4xl mx-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Warenkorb</h1>
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    alt="Mystic Grundspiel"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">Mystic Grundspiel</h3>
                    <p className="text-sm text-muted-foreground">29.99 €</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input 
                      type="number" 
                      value="1" 
                      className="w-16 text-center" 
                      min="1"
                    />
                    <Button variant="outline" size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Gesamt</span>
                <span>29.99 €</span>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(-1)}
                >
                  Zurück zum Shop
                </Button>
                <Link to="/checkout/address" className="w-full">
                  <Button className="w-full">
                    Zur Kasse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Cart;