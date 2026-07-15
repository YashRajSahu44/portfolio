import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  transitioning: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    const initial: Theme = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = useCallback(() => {
    setTransitioning(true);
    // let the girl slide in first, then swap the theme mid-animation
    window.setTimeout(() => {
      setTheme((prev) => {
        const next: Theme = prev === "light" ? "dark" : "light";
        document.documentElement.classList.toggle("dark", next === "dark");
        localStorage.setItem("theme", next);
        return next;
      });
    }, 450);
    window.setTimeout(() => setTransitioning(false), 1400);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, transitioning }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
