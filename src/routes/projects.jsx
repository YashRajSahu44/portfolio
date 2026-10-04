import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — Yash" }] }),
  component: Projects,
});

const projects = [
  {
    name: "SmartCampus",
    tag: "Campus marketplace",
    description: [
      "Developed a scalable in-campus marketplace platform for educational institutions.",
      "Streamlined resource allocation and marketplace management for students.",
      "Enabled efficient communication and digital services within the campus ecosystem.",
      "Designed the platform to improve accessibility, resource utilization, and student interaction.",
    ],
    stack: ["React", "Express", "MongoDB"],
    githubUrl: "https://github.com/YashRajSahu44/Swaply",
    liveUrl: "n3xtg3n.xyz/",
  },
  {
    name: "Doomy",
    tag: "Browser extension",
    description: [
      "Developed a Chrome extension that blocks distracting Reels and Shorts on YouTube and Instagram.",
      "Built a React-based interface to manage platform blocking preferences.",
      "Implemented automatic detection and blocking of short-form content.",
    ],
    stack: ["React", "Manifest V3"],
    githubUrl: "https://github.com/YashRajSahu44/doomy",
    liveUrl: "https://github.com/YashRajSahu44/doomy",
  },
  {
    name: "Personal Portfolio Website",
    tag: "Web",
    description: [
      "Developed and deployed a responsive personal portfolio website using React.js, showcasing projects, technical skills, certifications, and experience.",
      "Built reusable React components and implemented a responsive, modern UI optimized for different screen sizes.",
      "Structured the application for maintainability using a component-based architecture and integrated project-focused sections for an improved user experience.",
    ],
    stack: ["React", "CSS"],
    githubUrl: "https://github.com/YashRajSahu44/portfolio",
    liveUrl: "yashraj-nu.vercel.app",
  },
  {
    name: "TaxWise",
    tag: "Tax calculator",
    description: [
      "Developed a brutalist-styled income tax calculator based on India's New Tax Regime (FY 2025–26).",
      "Implemented instant tax estimation based on the user's annual income.",
      "Designed a clean, responsive interface focused on simplicity and ease of use.",
      "Added automated tax calculations to provide users with a quick estimate of their tax liability.",
    ],
    stack: ["JavaScript"],
    githubUrl: "https://github.com/YashRajSahu44/TaxWise",
    liveUrl: "https://yashrajsahu44.github.io/TaxWise/",
  },
];

function Projects() {
  return (
    <PageShell>
      <PageTitle eyebrow="Projects" title="Things I've" accent="built." />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {p.tag}
              </span>
              <div className="flex flex-wrap gap-3 text-sm">
                {p.githubUrl ? (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github size={16} aria-hidden="true" />
                    GitHub
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground/70">
                    <Github size={16} aria-hidden="true" />
                    GitHub link
                  </span>
                )}
                {p.liveUrl ? (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Live
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground/70">
                    <ExternalLink size={16} aria-hidden="true" />
                    Live link
                  </span>
                )}
              </div>
            </div>
            <h3 className="font-display text-2xl">{p.name}</h3>
            <ul className="mt-3 flex-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
              {p.description.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Technologies / tools used
              </p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
