import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/skills")({
  head: () => ({ meta: [{ title: "Skills — Yash" }] }),
  component: Skills,
});

const skills = [
  { name: "Java", note: "OOP & backend" },
  { name: "Python", note: "ML, scripting" },
  { name: "JavaScript", note: "modern web" },
  { name: "React", note: "component craft" },
  { name: "HTML", note: "semantic" },
  { name: "CSS", note: "responsive UI" },
  { name: "Git", note: "version control" },
  { name: "GitHub", note: "collab & CI" },
];

function Skills() {
  return (
    <PageShell>
      <PageTitle eyebrow="Skills" title="What I" accent="work with." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent"
          >
            <div className="font-display text-2xl">{s.name}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.note}</div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
