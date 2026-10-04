import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, PageTitle } from "@/components/PageShell";
export const Route = createFileRoute("/experience")({
  head: () => ({ meta: [{ title: "Experience — Yash" }] }),
  component: Experience,
});
const roles = [
  {
    title: "Contributor",
    company: "GSSoC — Girl Script Summer Of Code 2025",
    kind: "Open Source Internship",
    period: "Jun 2026 – Present · 2 mos",
    location: "Remote",
    bullets: [
      "Contributing to open-source projects across the GSSoC cohort.",
      "Collaborating with mentors and maintainers on issues, PRs and reviews.",
    ],
    tags: ["Open Source", "Git", "GitHub"],
  },
  {
    title: "Graphic Designer",
    company: "Chhota Start-up · Part-time",
    kind: "Youth-led startup",
    period: "Apr 2025 – Jul 2025 · 4 mos",
    location: "Sohagpur, Madhya Pradesh, India · On-site",
    bullets: [
      "Designed posters and promotional creatives for campaigns.",
      "Edited short-form videos for marketing and social media.",
      "Managed and optimized social media content for reach & engagement.",
      "Collaborated with the team to align visuals with brand strategy.",
    ],
    tags: ["Graphic Design", "Branding", "Social Media"],
  },
];
function Experience() {
  return (
    <PageShell>
      <PageTitle eyebrow="Experience" title="Where I've" accent="been." />
      <div className="space-y-5">
        {roles.map((r, i) => (
          <motion.article
            key={r.title + i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl">{r.title}</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {r.period}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {r.company} · <span className="italic">{r.kind}</span>
            </p>
            <p className="text-xs text-muted-foreground">{r.location}</p>
            <ul className="mt-4 space-y-1.5 text-sm leading-relaxed">
              {r.bullets.map((b) => (
                <li key={b} className="pl-4 -indent-4 before:mr-2 before:content-['—']">
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
