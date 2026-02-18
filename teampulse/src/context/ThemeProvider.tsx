import { useCallback, useMemo, useState, type ReactNode } from "react";
import { ThemeContext, type Theme, type ThemeContextType } from "./ThemeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const value: ThemeContextType = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
