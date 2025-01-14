import React from "react";
import { Card } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { actionCards } from "@/data/actionCards";

export const ActionCardsView = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {actionCards.map((card) => (
        <Card key={card.id} className="glass-card overflow-hidden">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={card.image}
              alt={card.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg">{card.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};