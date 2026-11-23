import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Trophy, Award, Sparkles, GitCommit } from "lucide-react";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/achievements")({
  head: () => ({ meta: [{ title: "Achievements — Yash" }] }),
  component: Achievements,
});

const achievements = [
  {
    icon: Trophy,
    title: "Finalist — TIT Srijan Hackathon 2026",
    highlight: "Top 2000+ Participants",
    description: (
      <>
        Selected from <strong className="font-semibold text-foreground">2000+ participants</strong>{" "}
        for developing <span className="italic text-foreground">SmartCampus</span>, an in-campus
        marketplace platform.
      </>
    ),
    badge: "Hackathon",
  },
  {
    icon: Trophy,
    title: "Finalist — AITR AI Manthan Indore Hackathon",
    highlight: "Top 1200+ Participants",
    description: (
      <>
        Selected among <strong className="font-semibold text-foreground">1200+ participants</strong>{" "}
        for innovative AI problem solving and implementation.
      </>
    ),
    badge: "Hackathon",
  },
  {
    icon: Award,
    title: "NPTEL Elite + Silver Certification",
    highlight: "Programming in Java",
    description:
      "Awarded Elite + Silver grade certification in Programming in Java, demonstrating deep grasp of core object-oriented programming, data structures, and algorithms.",
    badge: "Certification",
  },
  {
    icon: Sparkles,
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    highlight: "Oracle",
    description:
      "Certified foundational expertise in artificial intelligence, machine learning concepts, and OCI AI infrastructure.",
    badge: "Oracle Cloud",
  },
  {
    icon: Sparkles,
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    highlight: "Oracle",
    description:
      "Certified professional capability in Generative AI architectures, LLMs, prompt engineering, and fine-tuning on OCI.",
    badge: "Oracle Cloud",
  },
  {
    icon: GitCommit,
    title: "400+ GitHub Contributions in 5 Months",
    highlight: "Consistent Engineering",
    description: (
      <>
        Maintained high commit velocity with over{" "}
        <strong className="font-semibold text-foreground">400+ contributions</strong> in 5 months
        across open source repositories and personal systems.
      </>
    ),
    badge: "Open Source",
  },
];

function Achievements() {
  return (
    <PageShell>
      <PageTitle eyebrow="Honors & Proof" title="Key" accent="achievements." />
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.4 }}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/50 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {item.badge}
                </span>
              </div>
              <h2 className="mt-4 font-display text-xl leading-snug text-foreground md:text-2xl">
                {item.title}
              </h2>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-accent">
                {item.highlight}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.article>
          );
        })}
      </div>
    </PageShell>
  );
}
