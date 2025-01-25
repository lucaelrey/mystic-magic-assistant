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
      <div className="text-left">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {card.name}
        </h3>
        <p className="text-muted-foreground mt-2">{card.description}</p>
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-semibold text-primary mb-3">Regeln:</h4>
        <ul className="list-disc pl-4 space-y-2">
          {card.rules.map((rule, index) => (
            <li key={index} className="text-foreground ml-1">
              <span className="pl-1">{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);