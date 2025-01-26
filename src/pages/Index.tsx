import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/home/Hero";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 w-full">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;