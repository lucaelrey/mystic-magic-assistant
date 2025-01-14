import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section mit Kristall-Bild und Sparkles */}
        <section 
          className="relative h-screen flex items-center justify-center"
          style={{
            backgroundImage: "url('/lovable-uploads/8581ee81-b1a9-48a5-b204-58b6126cc464.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          {/* Dunkler Overlay für bessere Lesbarkeit */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Sparkles Effect */}
          <div className="absolute inset-0">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={70}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={0.5}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-6xl font-bold mb-6 text-white">
              Welcome to Mystic
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Experience the magical world of Mystic - the card game that brings strategy and mysticism together in perfect harmony.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/shop">
                <Button className="glass-button">
                  Mystic kaufen
                </Button>
              </Link>
              <Link to="/rules">
                <Button className="glass-button">
                  Spielregeln
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 py-16">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Learn to Play</h3>
              <p>Master the art of Mystic with our comprehensive guide and tutorials.</p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Track Your Games</h3>
              <p>Keep score and track your progress with our built-in game assistant.</p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Join the Community</h3>
              <p>Connect with other players and share your Mystic experience.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;