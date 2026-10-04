import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/lib/theme";
export function ThemeTransition() {
  const { transitioning, theme } = useTheme();
  return (
    <AnimatePresence>
      {transitioning && (
        <motion.div
          key="wipe"
          initial={{ clipPath: "circle(0% at 100% 0%)" }}
          animate={{ clipPath: "circle(150% at 100% 0%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
          className="pointer-events-none fixed inset-0 z-[60]"
          style={{
            background: theme === "light" ? "oklch(0.14 0.015 260)" : "oklch(0.985 0.008 85)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
