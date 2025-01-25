import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "@/components/shop/ProductImage";
import { ProductInfo } from "@/components/shop/ProductInfo";
import { PurchaseModule } from "@/components/shop/PurchaseModule";
import { ProductDescription } from "@/components/shop/ProductDescription";
import { useContent } from "@/hooks/useContent";

const Shop = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { content, translation, isLoading } = useContent('product', 'mystic-card-game');

  const handlePurchase = () => {
    navigate('/cart', { state: { quantity } });
  };

  if (isLoading || !content || !translation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        <Navigation />
        <main className="container mx-auto px-4 pt-20 md:pt-24 pb-12">
          <div className="text-center">Lädt...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navigation />
      <main className="container mx-auto px-4 pt-20 md:pt-24 pb-12">
        <Card className="glass-card max-w-6xl mx-auto overflow-visible">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8">
            <ProductImage 
              src="/lovable-uploads/cf7eccbe-9b33-4e52-aadf-a9bf531ba57b.png"
              alt={translation.title || ""}
            />

            <div className="space-y-6 md:space-y-8">
              <ProductInfo 
                title={translation.title || ""}
                price="29.90 CHF"
                shippingInfo={translation.content?.shipping_info || ""}
              />

              <PurchaseModule 
                quantity={quantity}
                onQuantityChange={setQuantity}
                onPurchase={handlePurchase}
              />
            </div>
          </div>

          <div className="p-4 md:p-8 border-t border-white/10">
            <ProductDescription 
              description={translation.description || ""}
              content={translation.content || {}}
            />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Shop;