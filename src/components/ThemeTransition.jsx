import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/lib/theme";

const slashSparkles = [
  { left: "48%", top: "42%", delay: 0.06 },
  { left: "54%", top: "48%", delay: 0.18 },
  { left: "60%", top: "42%", delay: 0.3 },
];

export function ThemeTransition() {
  const { transitioning, transitionTheme } = useTheme();

  return (
    <AnimatePresence>
      {transitioning && (
        <motion.div
          key="sword-slash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
          style={{
            background:
              transitionTheme === "dark" ? "oklch(0.14 0.015 260)" : "oklch(0.985 0.008 85)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, rotate: -35, scaleX: 0.15 }}
            animate={{ opacity: [0, 1, 0], rotate: [-35, -30, -25], scaleX: [0.15, 1.1, 1.5] }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 h-[16vh] w-[180vw] rounded-full blur-[12px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 18%, rgba(236,242,255,0.85) 34%, rgba(255,255,255,0.98) 50%, rgba(146,178,255,0.8) 63%, transparent 100%)",
              boxShadow:
                "0 0 28px rgba(173, 208, 255, 0.75), 0 0 52px rgba(255,255,255,0.4)",
              translate: "-50% -50%",
            }}
          />

          <motion.div
            initial={{ opacity: 0, rotate: -35, scaleX: 0.1 }}
            animate={{ opacity: [0, 1, 0], rotate: [-35, -30, -25], scaleX: [0.1, 1, 1.3] }}
            transition={{ duration: 0.38, delay: 0.04, ease: [0.2, 0.8, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 h-[10vh] w-[150vw] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 26%, rgba(255,255,255,1) 48%, rgba(196,220,255,0.82) 64%, transparent 100%)",
              boxShadow:
                "0 0 18px rgba(255,255,255,0.75), 0 0 28px rgba(136,169,255,0.55)",
              translate: "-50% -50%",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: [0, 1, 0], scale: [0.2, 1.2, 1.8] }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full"
            style={{
              background: "oklch(0.98 0.03 210)",
              boxShadow: "0 0 24px 8px oklch(0.9 0.08 210 / 0.7)",
              translate: "-50% -50%",
            }}
          />

          {slashSparkles.map((sparkle) => (
            <motion.div
              key={sparkle.left + sparkle.top}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.1, 1.8] }}
              transition={{ duration: 0.42, delay: sparkle.delay * 0.7, ease: [0.2, 0.8, 0.3, 1] }}
              className="absolute h-2 w-2 rounded-full"
              style={{
                left: sparkle.left,
                top: sparkle.top,
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 0 12px rgba(255,255,255,0.8)",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
