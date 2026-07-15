import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — Aditya" }] }),
  component: Projects,
});

const projects = [
  { name: "Coming soon", tag: "wip", blurb: "A backend playground I'm shipping next." },
  { name: "Coming soon", tag: "wip", blurb: "An ML side-quest — details soon." },
  { name: "Coming soon", tag: "ui", blurb: "A responsive UI/UX case study." },
];

function Projects() {
  return (
    <PageShell>
      <PageTitle eyebrow="Projects" title="Things I've" accent="built." />
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.tag}</div>
            <h3 className="font-display text-2xl">{p.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
            <div className="mt-8 h-24 rounded-lg bg-muted" />
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
