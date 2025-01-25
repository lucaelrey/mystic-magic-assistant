import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/home/Hero";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
      </main>
    </div>
  );
};

export default Index;