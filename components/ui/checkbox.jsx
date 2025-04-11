// components/ui/checkbox.jsx
"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(({ className, checked, onChange, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(checked || false);

  const handleChange = (e) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  return (
    <div className="relative inline-block">
      <input
        type="checkbox"
        ref={ref}
        checked={isChecked}
        onChange={handleChange}
        className="absolute opacity-0 w-4 h-4 cursor-pointer"
        {...props}
      />
      <div 
        className={cn(
          "h-4 w-4 rounded-sm border border-gray-300 flex items-center justify-center",
          isChecked ? "bg-blue-500 border-blue-500" : "bg-white",
          className
        )}
      >
        {isChecked && <Check className="h-3 w-3 text-white" />}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };