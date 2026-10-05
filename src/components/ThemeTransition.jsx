import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/lib/theme";
export function ThemeTransition() {
  const { transitioning, transitionTheme } = useTheme();
  return (
    <AnimatePresence>
      {transitioning && (
        <motion.div
          key="energy-pulse"
          initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0.9 }}
          animate={{ clipPath: "circle(150% at 50% 50%)", opacity: [0.9, 0.9, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 1.1, times: [0, 0.55, 1], ease: "linear" },
          }}
          className="pointer-events-none fixed inset-0 z-[60]"
          style={{
            background:
              transitionTheme === "dark" ? "oklch(0.14 0.015 260)" : "oklch(0.985 0.008 85)",
          }}
        >
          <motion.div
            initial={{ scale: 0.05, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle, transparent 48%, oklch(0.99 0.02 85 / 0.9) 49%, oklch(0.75 0.19 55 / 0.8) 49.5%, transparent 51%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
