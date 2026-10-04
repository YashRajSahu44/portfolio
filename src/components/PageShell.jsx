import { motion } from "motion/react";
export function PageShell({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className="flex flex-1 items-center px-6 pb-10 md:px-14"
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </motion.main>
  );
}
export function PageTitle({ eyebrow, title, accent }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </div>
      )}
      <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
        {title} {accent && <span className="highlight-marker text-ink">{accent}</span>}
      </h1>
    </div>
  );
}
