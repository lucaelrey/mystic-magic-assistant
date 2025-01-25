import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useContent } from "@/hooks/useContent";

export const NumberCardsScoring = () => {
  const { content, translation, isLoading } = useContent('number_card', 'number-cards-scoring');

  if (isLoading) {
    return (
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-primary/10 rounded w-1/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-primary/10 rounded w-3/4"></div>
              <div className="h-4 bg-primary/10 rounded w-2/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!translation?.content) {
    return null;
  }

  const { values, rules, scoring } = translation.content;
  
  return (
    <Card className="glass">
      <CardContent className="pt-6 text-left">
        <h2 className="text-2xl font-semibold mb-4">{translation.title}</h2>
        <div className="space-y-4">
          <h3 className="font-semibold mb-2">{values}</h3>
          <ul className="list-disc list-inside pl-4 space-y-2">
            {rules.map((rule: string, index: number) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
          <h3 className="font-semibold mb-2">{scoring.title}</h3>
          <ul className="list-disc list-inside pl-4 space-y-2">
            {scoring.rules.map((rule: string, index: number) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};