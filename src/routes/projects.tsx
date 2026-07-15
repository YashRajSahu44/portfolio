import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — Aditya" }] }),
  component: Projects,
});

const projects = [
  {
    name: "ChatBot",
    tag: "React",
    blurb: "A simple and responsive chatbot application built with React.",
    stack: ["React.js"],
  },
  {
    name: "Portfolio",
    tag: "Web",
    blurb:
      "A fully responsive personal portfolio website built with HTML, CSS and JavaScript. Showcases work, certifications, education and experience with clean UI and smooth animations.",
    stack: ["JavaScript", "CSS", "HTML"],
  },
  {
    name: "TaxWise",
    tag: "Web",
    blurb:
      "A clean, brutalist-styled income tax calculator based on India's New Tax Regime (FY 2025-26). Enter your annual income and get an instant tax estimate.",
    stack: ["JavaScript", "CSS", "HTML"],
  },
];

function Projects() {
  return (
    <PageShell>
      <PageTitle eyebrow="Projects" title="Things I've" accent="built." />
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.tag}</div>
            <h3 className="font-display text-2xl">{p.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
