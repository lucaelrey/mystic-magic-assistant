import React from "react";
import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { RulesHeader } from "@/components/rules/RulesHeader";
import { RulesTabs } from "@/components/rules/RulesTabs";
import { RulesOverview } from "@/components/rules/RulesOverview";
import { NumberCardsRoute } from "@/components/rules/NumberCardsRoute";
import { ActionCardsView } from "@/components/cards/ActionCardsView";
import { Footer } from "@/components/Footer";

const Rules = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-24">
        <RulesHeader />
        <RulesTabs />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

Rules.Overview = RulesOverview;
Rules.NumberCards = NumberCardsRoute;
Rules.ActionCards = ActionCardsView;

export default Rules;