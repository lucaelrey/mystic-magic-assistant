import React from "react";
import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { RulesHeader } from "@/components/rules/RulesHeader";
import { RulesTabs } from "@/components/rules/RulesTabs";
import { Footer } from "@/components/Footer";

const Rules = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24">
        <RulesHeader />
        <RulesTabs />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Rules;