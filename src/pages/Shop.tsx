import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/components/shop/ProductImage";
import { ProductInfo } from "@/components/shop/ProductInfo";
import { PurchaseModule } from "@/components/shop/PurchaseModule";
import { ProductDescription } from "@/components/shop/ProductDescription";

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
          {/* Main Product Section */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8">
            <ProductImage 
              src="/lovable-uploads/cf7eccbe-9b33-4e52-aadf-a9bf531ba57b.png"
              alt="Mystic Kartenspiel Box"
            />

            {/* Product Info and Purchase Module */}
            <div className="space-y-6 md:space-y-8">
              <ProductInfo 
                title="MYSTIC - Das Kartenspiel"
                price="29.90 CHF"
                shippingInfo="Versand per A-Post innerhalb der Schweiz im Preis inbegriffen"
              />

              <PurchaseModule 
                quantity={quantity}
                onQuantityChange={setQuantity}
                onPurchase={handlePurchase}
              />
            </div>
          </div>

          {/* Product Description */}
          <div className="p-4 md:p-8 border-t border-white/10">
            <ProductDescription />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Shop;