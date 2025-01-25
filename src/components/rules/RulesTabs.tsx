import React from "react";
import { Book, Hash, Wand2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

export const RulesTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { title: "Übersicht", icon: Book },
    { type: "separator" as const },
    { title: "Zahlenkarten", icon: Hash },
    { type: "separator" as const },
    { title: "Aktionskarten", icon: Wand2 },
  ];

  const getSelectedTabIndex = () => {
    switch (location.pathname) {
      case "/rules":
        return 0;
      case "/rules/number-cards":
        return 2;
      case "/rules/action-cards":
        return 4;
      default:
        return 0;
    }
  };

  const handleTabChange = (index: number | null) => {
    switch (index) {
      case 0:
        navigate("/rules");
        break;
      case 2:
        navigate("/rules/number-cards");
        break;
      case 4:
        navigate("/rules/action-cards");
        break;
    }
  };

  return (
    <ExpandableTabs
      tabs={tabs}
      className="mb-8 mx-auto max-w-2xl"
      defaultSelected={getSelectedTabIndex()}
      onChange={handleTabChange}
    />
  );
};