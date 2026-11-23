import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useTheme } from "@/lib/theme";

export function LampPullCord() {
  const { theme, toggle } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [isSwinging, setIsSwinging] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const audioCtxRef = useRef(null);

  // Directly track vertical pull offset
  const dragY = useMotionValue(0);

  // Base thread length 125px; stretches dynamically as the knob is pulled down
  const cordHeight = useTransform(dragY, (val) => 125 + Math.max(0, val));
  const bead1Y = useTransform(dragY, (val) => 40 + Math.max(0, val) * 0.3);
  const bead2Y = useTransform(dragY, (val) => 82 + Math.max(0, val) * 0.65);

  useEffect(() => {
    const hasSeenHint = sessionStorage.getItem("lamp_hint_seen");
    if (!hasSeenHint) {
      const timer = setTimeout(() => {
        setShowHint(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Mechanical switch click sound via Web Audio API
  const playSwitchClick = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      // High click snap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);

      // Low mechanical body clack
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thud.type = "triangle";
      thud.frequency.setValueAtTime(170, now);
      thud.frequency.exponentialRampToValueAtTime(65, now + 0.06);
      thudGain.gain.setValueAtTime(0.12, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      thud.connect(thudGain);
      thudGain.connect(ctx.destination);
      thud.start(now);
      thud.stop(now + 0.06);
    } catch {
      // Audio autoplay fallback
    }
  };

  const handlePullTrigger = () => {
    playSwitchClick();
    toggle();
    if (showHint) {
      setShowHint(false);
      sessionStorage.setItem("lamp_hint_seen", "true");
    }
  };

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    setIsSwinging(true);
    // If pulled down more than 22px or flicked down
    if (info.offset.y > 22 || info.velocity.y > 120) {
      handlePullTrigger();
    }
  };

  const handleClick = () => {
    if (isDragging) return;
    // Animate physical pull-down and snap-back
    animate(dragY, [0, 40, 0], {
      duration: 0.36,
      times: [0, 0.45, 1],
      ease: ["easeOut", "backOut"],
    });
    handlePullTrigger();
  };

  return (
    <div
      className="fixed right-4 top-0 z-50 select-none md:right-8"
      style={{ pointerEvents: "auto" }}
      aria-label="Lamp theme pull-cord"
    >
      {/* Ceiling Mount Bracket */}
      <div className="absolute -top-1 left-1/2 h-2.5 w-6 -translate-x-1/2 rounded-b-md border border-border bg-foreground/80 shadow-sm" />

      {/* Swaying Lamp Thread & Handle */}
      <motion.div
        className="flex flex-col items-center"
        style={{ transformOrigin: "top center" }}
        animate={
          isSwinging && !isDragging
            ? {
                rotate: [-1.8, 1.8, -1.8],
                transition: {
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : { rotate: 0 }
        }
      >
        {/* Thread SVG that extends downwards with dragY */}
        <svg width="20" height="125" className="overflow-visible">
          {/* Thread Shadow */}
          <motion.line
            x1="11"
            y1="0"
            x2="11"
            y2={cordHeight}
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          {/* Main Braided Cord */}
          <motion.line
            x1="10"
            y1="0"
            x2="10"
            y2={cordHeight}
            stroke={theme === "dark" ? "rgba(255,255,255,0.85)" : "rgba(35,35,35,0.75)"}
            strokeWidth="1.5"
            strokeDasharray="2.5 2.5"
            strokeLinecap="round"
          />
          {/* Small decorative beads that stretch along cord */}
          <motion.circle
            cx="10"
            cy={bead1Y}
            r="2"
            fill={theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(45,45,45,0.7)"}
          />
          <motion.circle
            cx="10"
            cy={bead2Y}
            r="2"
            fill={theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(45,45,45,0.7)"}
          />
        </svg>

        {/* Pull Handle / Lamp Knob */}
        <motion.button
          type="button"
          style={{ y: dragY }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 55 }}
          dragElastic={0.25}
          dragSnapToOrigin
          onDragStart={() => {
            setIsDragging(true);
            setIsSwinging(false);
          }}
          onDragEnd={handleDragEnd}
          onClick={handleClick}
          whileHover={{ scale: 1.15 }}
          className="group relative -mt-1 flex flex-col items-center cursor-grab active:cursor-grabbing focus:outline-none"
          title={theme === "dark" ? "Pull cord to turn on lights" : "Pull cord to turn off lights"}
          aria-label={`Lamp cord switch: currently ${theme} mode. Pull to switch.`}
        >
          {/* Top brass connector ring */}
          <div className="h-1.5 w-2 rounded-t-sm border border-border bg-foreground/60" />

          {/* Lamp Knob Body */}
          <div
            className={`relative flex h-8 w-5 items-center justify-center rounded-full border transition-all duration-300 ${
              theme === "dark"
                ? "border-amber-400/90 bg-gradient-to-b from-amber-500/90 to-amber-700 text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.85),0_0_35px_rgba(245,158,11,0.45)]"
                : "border-border bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400 text-foreground shadow-md hover:brightness-105"
            }`}
          >
            {/* Center glowing filament / core */}
            <div
              className={`h-3 w-1 rounded-full transition-opacity duration-300 ${
                theme === "dark"
                  ? "bg-amber-100 shadow-[0_0_8px_#fff] animate-pulse"
                  : "bg-stone-500/60"
              }`}
            />
          </div>

          {/* Bottom decorative bead */}
          <div
            className={`-mt-0.5 h-1.5 w-1.5 rounded-full ${
              theme === "dark" ? "bg-amber-300 shadow-[0_0_6px_#f59e0b]" : "bg-stone-500"
            }`}
          />

          {/* Floating Pull Hint */}
          {showHint && (
            <motion.div
              initial={{ opacity: 0, x: -6, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-card/95 px-2 py-1 font-mono text-[10px] tracking-wider text-muted-foreground shadow-lg backdrop-blur"
            >
              pull cord ↓
            </motion.div>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
