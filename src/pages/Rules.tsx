import { Navigation } from "@/components/Navigation";

const Rules = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Game Rules
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card">
            <h2 className="text-2xl font-semibold mb-4">Basic Rules</h2>
            <ul className="space-y-4">
              <li>Rule 1: Description of the first basic rule</li>
              <li>Rule 2: Description of the second basic rule</li>
              <li>Rule 3: Description of the third basic rule</li>
            </ul>
          </div>
          <div className="glass-card">
            <h2 className="text-2xl font-semibold mb-4">Advanced Rules</h2>
            <ul className="space-y-4">
              <li>Rule 1: Description of the first advanced rule</li>
              <li>Rule 2: Description of the second advanced rule</li>
              <li>Rule 3: Description of the third advanced rule</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rules;