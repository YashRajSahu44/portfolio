import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/lib/theme";

const rippleDelays = [0, 0.22, 0.44];

export function ThemeTransition() {
  const { transitioning, transitionTheme } = useTheme();
  return (
    <AnimatePresence>
      {transitioning && (
        <motion.div
          key="water-ripple"
          initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0.9 }}
          animate={{ clipPath: "circle(150% at 50% 50%)", opacity: [0.9, 0.9, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2.0,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 1.9, times: [0, 0.65, 1], ease: "linear" },
          }}
          className="pointer-events-none fixed inset-0 z-[60]"
          style={{
            background:
              transitionTheme === "dark" ? "oklch(0.14 0.015 260)" : "oklch(0.985 0.008 85)",
          }}
        >
          {rippleDelays.map((delay) => (
            <motion.div
              key={delay}
              initial={{ scale: 0.08, opacity: 0 }}
              animate={{ scale: [0.08, 1, 2.4], opacity: [0, 0.72, 0] }}
              transition={{
                duration: 1.45,
                delay,
                ease: [0.2, 0.65, 0.3, 1],
              }}
              className="absolute left-1/2 top-1/2 h-[24vmin] w-[24vmin] rounded-full"
              style={{
                border: "1px solid oklch(0.96 0.04 210 / 0.75)",
                boxShadow:
                  "0 0 18px oklch(0.8 0.08 210 / 0.3), inset 0 0 12px oklch(0.96 0.04 210 / 0.18)",
                translate: "-50% -50%",
              }}
            />
          ))}
          <motion.div
            initial={{ scale: 0.15, opacity: 0 }}
            animate={{ scale: [0.15, 1.15, 0.7], opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full"
            style={{
              background: "oklch(0.98 0.03 210)",
              boxShadow: "0 0 24px 8px oklch(0.9 0.08 210 / 0.6)",
              translate: "-50% -50%",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
