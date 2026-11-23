import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "motion/react";
import { useTheme } from "@/lib/theme";

export function LampPullCord() {
  const { theme, toggle } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Raw interactive displacements (X and Y)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Realistic fluid physics springs for 2D flexible motion
  const springX = useSpring(rawX, { stiffness: 260, damping: 15, mass: 0.7 });
  const springY = useSpring(rawY, { stiffness: 380, damping: 18, mass: 0.7 });

  // Dynamically calculate smooth SVG curved path for the flexible thread
  const pathData = useTransform([springX, springY], ([x, y]) => {
    const startX = 50;
    const startY = 0;
    const endX = 50 + x;
    const endY = 125 + y;
    // Quadratic bezier control point creates natural rope bending
    const ctrlX = 50 + x * 0.45;
    const ctrlY = (125 + y) * 0.52;
    return `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
  });

  // Decorative beads positions along the curved thread
  const bead1X = useTransform(springX, (x) => 50 + x * 0.32);
  const bead1Y = useTransform(springY, (y) => 42 + y * 0.35);
  const bead2X = useTransform(springX, (x) => 50 + x * 0.68);
  const bead2Y = useTransform(springY, (y) => 84 + y * 0.7);

  // Knob tilts naturally in the direction of swing
  const knobRotate = useTransform(springX, [-50, 50], [-24, 24]);

  // Gentle idle swaying when untouched
  useEffect(() => {
    let active = true;
    let swayAnimation = null;

    const startIdleSway = () => {
      if (!isHovered && !isDragging && active) {
        swayAnimation = animate(rawX, [-5, 5, -5], {
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        });
      }
    };

    if (!isHovered && !isDragging) {
      startIdleSway();
    } else {
      swayAnimation?.stop();
    }

    return () => {
      active = false;
      swayAnimation?.stop();
    };
  }, [isHovered, isDragging, rawX]);

  // One-time discovery hint
  useEffect(() => {
    const hasSeenHint = sessionStorage.getItem("lamp_hint_seen");
    if (!hasSeenHint) {
      const timer = setTimeout(() => setShowHint(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Web Audio API mechanical switch snap
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
      // High frequency mechanical click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2500, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);

      // Low frequency body thud
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thud.type = "triangle";
      thud.frequency.setValueAtTime(175, now);
      thud.frequency.exponentialRampToValueAtTime(60, now + 0.06);
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

  const handlePullTrigger = useCallback(() => {
    playSwitchClick();
    toggle();
    if (showHint) {
      setShowHint(false);
      sessionStorage.setItem("lamp_hint_seen", "true");
    }
  }, [toggle, showHint]);

  // Pointer movement tracking over interaction zone (all directions hover)
  const handlePointerMove = (e) => {
    if (isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Anchor center is at (rect.left + rect.width / 2, rect.top)
    const centerX = rect.left + rect.width / 2;
    const knobCenterY = rect.top + 125;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - knobCenterY;

    // Follow cursor with elastic damping
    const clampedX = Math.max(-45, Math.min(45, deltaX * 0.45));
    const clampedY = Math.max(-15, Math.min(50, deltaY * 0.45));

    rawX.set(clampedX);
    rawY.set(clampedY);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (!isDragging) {
      // Snap back to neutral with spring bounce
      rawX.set(0);
      rawY.set(0);
    }
  };

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    // Snap back
    rawX.set(0);
    rawY.set(0);

    // ONLY toggle theme when physically pulled down past threshold
    if (info.offset.y > 22 || info.velocity.y > 120) {
      handlePullTrigger();
    }
  };

  const handleClick = (e) => {
    // Do NOT change theme on simple click - only pulling down switches the theme
    e.preventDefault();
    e.stopPropagation();
    if (isDragging) return;

    // Playful small wobble indicating it should be pulled down
    animate(rawY, [0, 10, -5, 0], {
      duration: 0.35,
      ease: "easeOut",
    });
    animate(rawX, [0, 5, -5, 0], {
      duration: 0.4,
      ease: "easeOut",
    });

    // Show prompt to pull
    setShowHint(true);
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      className="fixed right-3 top-0 z-50 h-52 w-28 select-none md:right-8"
      style={{ pointerEvents: "auto" }}
      aria-label="Interactive flexible lamp pull-cord"
    >
      {/* Ceiling Mount Bracket */}
      <div className="absolute left-1/2 top-0 h-2.5 w-6 -translate-x-1/2 rounded-b-md border border-border bg-foreground/80 shadow-sm" />

      {/* SVG Canvas for the Flexible Curved String */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 220"
        className="pointer-events-none absolute inset-0 overflow-visible"
      >
        {/* Shadow curved path */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="1.6"
          strokeDasharray="3 3"
          transform="translate(1, 1)"
        />

        {/* Main Flexible Cord */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={theme === "dark" ? "rgba(255,255,255,0.85)" : "rgba(35,35,35,0.78)"}
          strokeWidth="1.5"
          strokeDasharray="2.5 2.5"
          strokeLinecap="round"
        />

        {/* Decorative beads moving dynamically along the curve */}
        <motion.circle
          cx={bead1X}
          cy={bead1Y}
          r="2.2"
          fill={theme === "dark" ? "rgba(255,255,255,0.75)" : "rgba(45,45,45,0.75)"}
        />
        <motion.circle
          cx={bead2X}
          cy={bead2Y}
          r="2.2"
          fill={theme === "dark" ? "rgba(255,255,255,0.75)" : "rgba(45,45,45,0.75)"}
        />
      </svg>

      {/* Pull Handle / Lamp Knob with 2D Drag & Hover Physics */}
      <motion.button
        type="button"
        style={{
          x: springX,
          y: springY,
          rotate: knobRotate,
        }}
        drag
        dragConstraints={{ left: -45, right: 45, top: -20, bottom: 65 }}
        dragElastic={0.25}
        dragSnapToOrigin
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        whileHover={{ scale: 1.15 }}
        className="group absolute left-1/2 top-[125px] flex -translate-x-1/2 flex-col items-center cursor-grab active:cursor-grabbing focus:outline-none"
        title={theme === "dark" ? "Pull cord to turn on lights" : "Pull cord to turn off lights"}
        aria-label={`Lamp cord switch: currently ${theme} mode. Pull in any direction to interact.`}
      >
        {/* Top brass connector ring */}
        <div className="h-1.5 w-2 rounded-t-sm border border-border bg-foreground/70" />

        {/* Lamp Knob Body */}
        <div
          className={`relative flex h-8 w-5 items-center justify-center rounded-full border transition-all duration-300 ${
            theme === "dark"
              ? "border-amber-400/90 bg-gradient-to-b from-amber-500/90 to-amber-700 text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.85),0_0_35px_rgba(245,158,11,0.45)]"
              : "border-border bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400 text-foreground shadow-md hover:brightness-105"
          }`}
        >
          {/* Center glowing filament */}
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

        {/* Floating Hint */}
        {showHint && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-card/95 px-2 py-1 font-mono text-[10px] tracking-wider text-muted-foreground shadow-lg backdrop-blur"
          >
            pull cord ↓
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
