import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Mystic Grundspiel",
    price: 29.99,
    description: "Das komplette Grundspiel mit allen Karten und Spielanleitung.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Mystische Erweiterung",
    price: 19.99,
    description: "Neue Aktionskarten und spezielle Effekte für noch mehr Spielspaß.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Deluxe Edition",
    price: 49.99,
    description: "Premium Version mit hochwertigen Materialien und exklusiven Karten.",
    image: "/placeholder.svg"
  }
];

const Shop = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Mystic Shop
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entdecke unsere Spielekollektion und Erweiterungen für noch mehr magische Momente.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="glass-card">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-xl font-bold">{product.price} €</span>
                <Button className="glass-button">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  In den Warenkorb
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Shop;