"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext } from "react";
import { greenTheme } from "@/lib/theme";

export const ThemeContext = createContext(greenTheme);

export function ThemeProvider({ children, ...props }) {
  return (
    <ThemeContext.Provider value={greenTheme}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContext.Provider>
  );
}