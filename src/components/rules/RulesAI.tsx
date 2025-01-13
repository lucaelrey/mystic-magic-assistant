import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AIInputWithLoading } from "@/components/ai/AIInputWithLoading";
import { useToast } from "@/components/ui/use-toast";

export const RulesAI = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const { toast } = useToast();

  const handleSubmit = async (message: string) => {
    if (!apiKey) {
      toast({
        title: "API Key fehlt",
        description: "Bitte geben Sie einen Perplexity API Key ein, um fortzufahren.",
        variant: "destructive",
      });
      return;
    }

    try {
      setMessages(prev => [...prev, { role: 'user', content: message }]);

      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'Du bist ein Experte für das Kartenspiel und hilfst Spielern, die Regeln besser zu verstehen. Antworte präzise und freundlich auf Deutsch.'
            },
            ...messages,
            { role: 'user', content: message }
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Es gab einen Fehler bei der Verarbeitung Ihrer Anfrage.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass">
      <CardContent className="pt-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Regelassistent</h2>
        
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-primary/10 ml-auto max-w-[80%]'
                  : 'bg-secondary/10 mr-auto max-w-[80%]'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <input
            type="password"
            placeholder="Perplexity API Key"
            className="w-full p-2 rounded-lg bg-black/5 dark:bg-white/5 border-none"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <AIInputWithLoading
            placeholder="Stelle eine Frage zu den Spielregeln..."
            onSubmit={handleSubmit}
          />
        </div>
      </CardContent>
    </Card>
  );
};