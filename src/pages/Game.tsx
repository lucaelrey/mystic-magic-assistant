import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Game = () => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Game Assistant
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card">
            <h2 className="text-2xl font-semibold mb-4">Player 1</h2>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">{player1Score}</div>
              <div className="flex gap-2">
                <Button onClick={() => setPlayer1Score(s => s + 1)}>+1</Button>
                <Button onClick={() => setPlayer1Score(s => s - 1)}>-1</Button>
              </div>
            </div>
          </div>
          <div className="glass-card">
            <h2 className="text-2xl font-semibold mb-4">Player 2</h2>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">{player2Score}</div>
              <div className="flex gap-2">
                <Button onClick={() => setPlayer2Score(s => s + 1)}>+1</Button>
                <Button onClick={() => setPlayer2Score(s => s - 1)}>-1</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;