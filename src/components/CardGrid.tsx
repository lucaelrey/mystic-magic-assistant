import React from "react";
import { Card } from "@/components/ui/card";
import Image from "./ui/image";
import { useNavigate } from "react-router-dom";

interface CardData {
  id: string;
  name: string;
  image: string;
  description: string;
  rules: string[];
}

interface CardGridProps {
  cards: CardData[];
}

export const CardGrid = ({ cards }: CardGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card 
          key={card.id}
          className="w-full cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden"
          onClick={() => navigate(`/card/${card.id}`)}
        >
          <picture>
            <source srcSet={`/lovable-uploads/${card.id}.webp`} type="image/webp" />
            <Image
              src={`/lovable-uploads/${card.id}.png`}
              alt={card.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </picture>
        </Card>
      ))}
    </div>
  );
};