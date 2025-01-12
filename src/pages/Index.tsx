import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <section className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Welcome to Mystic
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Experience the magical world of Mystic - the card game that brings strategy and mysticism together in perfect harmony.
          </p>
          <div className="flex gap-4">
            <Link to="/game">
              <Button className="glass-button">Start Playing</Button>
            </Link>
            <Link to="/rules">
              <Button variant="outline" className="glass">
                Learn the Rules
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 py-16">
          <div className="glass-card">
            <h3 className="text-xl font-semibold mb-4">Learn to Play</h3>
            <p>Master the art of Mystic with our comprehensive guide and tutorials.</p>
          </div>
          <div className="glass-card">
            <h3 className="text-xl font-semibold mb-4">Track Your Games</h3>
            <p>Keep score and track your progress with our built-in game assistant.</p>
          </div>
          <div className="glass-card">
            <h3 className="text-xl font-semibold mb-4">Join the Community</h3>
            <p>Connect with other players and share your Mystic experience.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;