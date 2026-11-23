import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/experience")({
  head: () => ({ meta: [{ title: "Experience — Yash" }] }),
  component: Experience,
});

const experiences = [
  {
    period: "2025 — 2029",
    title: "B.Tech in CSE (AIML)",
    organization: "Lakshmi Narain College of Technology (LNCT)",
    kind: "Education",
    location: "Bhopal, India",
    description:
      "Undergraduate studies specializing in Artificial Intelligence & Machine Learning, building a strong foundation in backend development, algorithms, and applied ML.",
    tags: ["AIML", "Python", "DSA", "Backend"],
  },
  {
    period: "Jun 2025 — Present",
    title: "Open Source Contributor",
    organization: "GSSoC — GirlScript Summer Of Code",
    kind: "Open Source",
    location: "Remote",
    bullets: [
      "Contributing to open-source projects across the GSSoC cohort.",
      "Collaborating with mentors and maintainers on issues, PRs, and code reviews.",
    ],
    tags: ["Open Source", "Git", "GitHub"],
  },
  {
    period: "Apr 2025 – Jul 2025",
    title: "Graphic Designer",
    organization: "Chhota Start-up",
    kind: "Youth-led startup · Part-time",
    location: "Sohagpur, MP, India",
    bullets: [
      "Designed posters and promotional creatives for marketing campaigns.",
      "Edited short-form videos for social media to boost reach and engagement.",
      "Collaborated with the team to align visuals with brand strategy.",
    ],
    tags: ["Graphic Design", "Branding", "Social Media"],
  },
];

function Experience() {
  return (
    <PageShell>
      <PageTitle eyebrow="Experience & Education" title="Where I've" accent="been." />
      <div className="border-t border-border">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.title + exp.period}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 * i, duration: 0.4 }}
            className="grid grid-cols-1 gap-2 border-b border-border py-6 transition-colors hover:bg-secondary/15 md:grid-cols-[220px_1fr] md:gap-8 md:py-8"
          >
            <div className="pt-0.5 text-xs uppercase tracking-[0.22em] text-muted-foreground sm:text-sm">
              {exp.period}
            </div>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-sans text-base font-medium uppercase tracking-wider text-foreground sm:text-lg">
                  {exp.title}
                </h2>
                <span className="text-xs italic text-muted-foreground">{exp.kind}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                {exp.organization}{" "}
                <span className="text-xs font-normal text-muted-foreground">· {exp.location}</span>
              </p>
              {exp.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {exp.description}
                </p>
              )}
              {exp.bullets && (
                <ul className="mt-2.5 space-y-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {exp.bullets.map((b) => (
                    <li key={b} className="pl-4 -indent-4 before:mr-2 before:content-['—']">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {exp.tags && (
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
