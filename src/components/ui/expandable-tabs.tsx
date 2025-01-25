import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { TabButton } from "./tab-button";
import { TabSeparator } from "./tab-separator";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: undefined;
}

interface Separator {
  type: "separator";
  title?: string;
  icon?: LucideIcon;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  defaultSelected?: number | null;
  onChange?: (index: number | null) => void;
}

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  defaultSelected = null,
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(defaultSelected);

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border bg-background p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <TabSeparator key={`separator-${index}`} />;
        }

        return (
          <TabButton
            key={(tab as Tab).title}
            icon={(tab as Tab).icon}
            title={(tab as Tab).title}
            isSelected={selected === index}
            onClick={() => handleSelect(index)}
            activeColor={activeColor}
          />
        );
      })}
    </div>
  );
}