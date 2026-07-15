import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/lib/theme";
import girlAsset from "@/assets/anime-apple-girl.png.asset.json";

export function ThemeTransition() {
  const { transitioning, theme } = useTheme();

  return (
    <AnimatePresence>
      {transitioning && (
        <>
          {/* full-screen ink wipe */}
          <motion.div
            key="wipe"
            initial={{ clipPath: "circle(0% at 90% 8%)" }}
            animate={{ clipPath: "circle(150% at 90% 8%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
            className="pointer-events-none fixed inset-0 z-[60]"
            style={{
              background: theme === "light" ? "oklch(0.14 0.015 260)" : "oklch(0.985 0.008 85)",
            }}
          />
          {/* anime girl swoops across */}
          <motion.div
            key="girl"
            initial={{ x: "110vw", y: "10vh", rotate: 25, scale: 0.6 }}
            animate={{
              x: ["110vw", "40vw", "-40vw"],
              y: ["10vh", "20vh", "35vh"],
              rotate: [25, -8, -35],
              scale: [0.6, 1.05, 0.7],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: [0.5, 0, 0.2, 1], times: [0, 0.55, 1] }}
            className="pointer-events-none fixed inset-0 z-[70] flex items-start justify-start"
          >
            <img
              src={girlAsset.url}
              alt=""
              width={420}
              height={560}
              className="h-[70vh] w-auto drop-shadow-2xl"
              style={{ filter: theme === "light" ? "invert(1)" : "none" }}
            />
          </motion.div>
          {/* sparkle burst */}
          <motion.div
            key="spark"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.2, 1.6, 2.4] }}
            transition={{ duration: 1.2, times: [0, 0.4, 1] }}
            className="pointer-events-none fixed left-[42vw] top-[28vh] z-[75] text-6xl"
          >
            ✦
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
