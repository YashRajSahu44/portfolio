import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/achievements")({
  head: () => ({ meta: [{ title: "Achievements — Yash" }] }),
  component: Achievements,
});

const achievements = [
  {
    period: "2026",
    title: "Finalist — TIT Srijan Hackathon",
    organization: "SmartCampus Project",
    kind: "National Hackathon",
    description: (
      <>
        Selected from <strong className="font-semibold text-foreground">2000+ participants</strong>{" "}
        for developing <span className="italic text-foreground">SmartCampus</span>, an in-campus
        marketplace platform.
      </>
    ),
  },
  {
    period: "2026",
    title: "Finalist — AITR AI Manthan Hackathon",
    organization: "AITR Indore",
    kind: "AI Hackathon",
    description: (
      <>
        Selected among <strong className="font-semibold text-foreground">1200+ participants</strong>{" "}
        for innovative artificial intelligence problem solving.
      </>
    ),
  },
  {
    period: "2025",
    title: "NPTEL Elite + Silver Certification",
    organization: "NPTEL · IIT Kharagpur",
    kind: "Academic Excellence",
    description:
      "Awarded Elite + Silver certificate in Programming in Java, demonstrating deep command of core OOP and algorithms.",
  },
  {
    period: "2025",
    title: "OCI Certified AI Foundations Associate",
    organization: "Oracle",
    kind: "Cloud & AI",
    description:
      "Certified foundational expertise in artificial intelligence, machine learning, and cloud infrastructure.",
  },
  {
    period: "2025",
    title: "OCI Certified Generative AI Professional",
    organization: "Oracle",
    kind: "Professional Certification",
    description:
      "Certified professional capability in Generative AI architectures, LLM pipelines, and fine-tuning.",
  },
  {
    period: "2025 — Present",
    title: "400+ GitHub Contributions",
    organization: "Open Source & Engineering",
    kind: "Consistency",
    description: (
      <>
        Achieved over <strong className="font-semibold text-foreground">400+ contributions</strong>{" "}
        within 5 months across open source projects and personal software development.
      </>
    ),
  },
];

function Achievements() {
  return (
    <PageShell>
      <PageTitle eyebrow="Honors & Proof" title="Key" accent="achievements." />
      <div className="border-t border-border">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i, duration: 0.4 }}
            className="grid grid-cols-1 gap-2 border-b border-border py-6 transition-colors hover:bg-secondary/15 md:grid-cols-[220px_1fr] md:gap-8 md:py-8"
          >
            <div className="pt-0.5 text-xs uppercase tracking-[0.22em] text-muted-foreground sm:text-sm">
              {item.period}
            </div>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-sans text-base font-medium uppercase tracking-wider text-foreground sm:text-lg">
                  {item.title}
                </h2>
                {item.kind && (
                  <span className="text-xs italic text-muted-foreground">{item.kind}</span>
                )}
              </div>
              {item.organization && (
                <p className="mt-1 text-sm font-medium text-foreground">{item.organization}</p>
              )}
              {item.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
