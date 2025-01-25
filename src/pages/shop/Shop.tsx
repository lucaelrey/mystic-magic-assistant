import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/shop/ProductImage";
import { ProductInfo } from "@/components/shop/ProductInfo";
import { ProductDescription } from "@/components/shop/ProductDescription";
import { PurchaseModule } from "@/components/shop/PurchaseModule";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Shop = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const cardClassName = isMobile 
    ? "bg-background/95 border-white/10 max-w-6xl mx-auto overflow-visible"
    : "glass-card max-w-6xl mx-auto overflow-visible bg-black/40 backdrop-blur-xl border-white/10";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navigation />
      <main className="container mx-auto px-4 pt-20 pb-24 md:pt-24 md:pb-12">
        <Card className={cardClassName}>
          {/* Main Product Section */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8">
            <ProductImage 
              src="/lovable-uploads/cf7eccbe-9b33-4e52-aadf-a9bf531ba57b.png"
              alt={language === 'en' ? "Mystic Card Game Box" : "Mystic Kartenspiel Box"}
              className="order-1 md:order-none"
            />

            {/* Product Info and Purchase Module */}
            <div className="space-y-6 md:space-y-8 order-2 md:order-none">
              <ProductInfo 
                title={language === 'en' ? "MYSTIC - The Card Game" : "MYSTIC - Das Kartenspiel"}
                price="29.90 CHF"
                shippingInfo={language === 'en' ? "Free shipping in Switzerland" : "Versandkostenfrei in der Schweiz"}
              />
              <PurchaseModule />
            </div>
          </div>

          {/* Product Description Section */}
          <div className="px-6 md:px-8 pb-8">
            <ProductDescription />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Shop;