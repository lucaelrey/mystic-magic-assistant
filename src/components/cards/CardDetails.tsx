import React from "react";
import { cn } from "@/lib/utils";
import Image from "@/components/ui/image";

interface CardDetailsProps {
  card: {
    image: string;
    name: string;
    description: string;
    rules: string[];
  };
  className?: string;
}

export const CardDetails = ({ card, className = "" }: CardDetailsProps) => (
  <div className={cn("space-y-6", className)}>
    <div className="flex justify-center">
      <Image
        src={card.image}
        alt={card.name}
        className="w-full max-w-[200px] md:max-w-[240px] h-auto object-contain rounded-lg shadow-lg"
      />
    </div>
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {card.name}
        </h3>
        <p className="text-muted-foreground mt-2">{card.description}</p>
      </div>
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <h4 className="font-semibold text-primary">Regeln:</h4>
        <ul className="space-y-2">
          {card.rules.map((rule, index) => (
            <li key={index} className="flex items-start gap-2 text-foreground">
              <span className="text-primary mt-1">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);