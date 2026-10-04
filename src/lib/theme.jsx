import { createContext, useCallback, useContext, useEffect, useState } from "react";
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [transitioning, setTransitioning] = useState(false);
  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("theme");
    const initial =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const toggle = useCallback(() => {
    setTransitioning(true);
    // let the girl slide in first, then swap the theme mid-animation
    window.setTimeout(() => {
      setTheme((prev) => {
        const next = prev === "light" ? "dark" : "light";
        document.documentElement.classList.toggle("dark", next === "dark");
        localStorage.setItem("theme", next);
        return next;
      });
    }, 450);
    window.setTimeout(() => setTransitioning(false), 1400);
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, toggle, transitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
