import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/home/Hero";

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <Navigation />
      <main className="w-full">
        <Hero />
      </main>
    </div>
  );
};

export default Index;