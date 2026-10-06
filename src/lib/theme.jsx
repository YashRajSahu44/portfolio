import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [transitioning, setTransitioning] = useState(false);
  const [transitionTheme, setTransitionTheme] = useState(null);
  const themeRef = useRef("light");
  const transitioningRef = useRef(false);
  const themeTimeout = useRef(null);
  const transitionTimeout = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    themeRef.current = initial;
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");

    return () => {
      window.clearTimeout(themeTimeout.current);
      window.clearTimeout(transitionTimeout.current);
    };
  }, []);

  const toggle = useCallback(() => {
    if (transitioningRef.current) return;

    const next = themeRef.current === "light" ? "dark" : "light";
    transitioningRef.current = true;
    themeRef.current = next;
    setTransitionTheme(next);
    setTransitioning(true);

    themeTimeout.current = window.setTimeout(() => {
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      setTheme(next);
    }, 180);

    transitionTimeout.current = window.setTimeout(() => {
      transitioningRef.current = false;
      setTransitioning(false);
      setTransitionTheme(null);
    }, 900);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, transitioning, transitionTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
