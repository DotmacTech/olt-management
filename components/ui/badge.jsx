// components/ui/badge.jsx

import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({
  className,
  variant = "default",
  ...props
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-primary text-primary-foreground hover:bg-primary/80": variant === "default",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "bg-destructive text-destructive-foreground hover:bg-destructive/80": variant === "destructive",
          "bg-outline text-foreground": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };