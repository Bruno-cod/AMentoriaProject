"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export interface SuggestionChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

const SuggestionChip = React.forwardRef<HTMLButtonElement, SuggestionChipProps>(
  ({ className, label, active, onClick, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        onClick={onClick}
        variant="outline"
        className={cn(
          "rounded-3xl border-2 px-6 py-2 text-body-default transition-all",
          active
            ? "border-neutras-900 bg-neutras-900 text-white shadow-md hover:bg-transparent hover:text-neutras-900"
            : "border-neutras-900 bg-transparent text-neutras-900 hover:bg-neutras-900 hover:text-white",
          className
        )}
        {...props}
      >
        {label}
      </Button>
    );
  }
);
SuggestionChip.displayName = "SuggestionChip";

export { SuggestionChip };