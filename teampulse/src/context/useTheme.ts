import { useContext } from "react";
import { ThemeContext, type ThemeContextType } from "./ThemeContext";

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme måste användas inom ThemeProvider");
  return ctx;
}
