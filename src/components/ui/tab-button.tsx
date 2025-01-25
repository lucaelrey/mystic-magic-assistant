import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TabButtonProps {
  icon: LucideIcon;
  title: string;
  isSelected: boolean;
  onClick: () => void;
  activeColor?: string;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function TabButton({
  icon: Icon,
  title,
  isSelected,
  onClick,
  activeColor = "text-primary",
}: TabButtonProps) {
  return (
    <motion.button
      variants={buttonVariants}
      initial={false}
      animate="animate"
      custom={isSelected}
      onClick={onClick}
      transition={transition}
      className={cn(
        "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
        isSelected
          ? cn("bg-muted", activeColor)
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon size={20} />
      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="overflow-hidden"
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}