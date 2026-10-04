import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — Yash" }] }),
  component: Projects,
});

const projects = [
  {
    name: "SmartCampus",
    description:
      "A scalable in-campus marketplace for educational institutions, streamlining resource allocation, student communication, and digital campus services.",
    stack: ["React", "Express", "MongoDB"],
    preview: {
      type: "image",
      src: "/smartcampus-preview.png",
      alt: "SmartCampus marketplace homepage",
    },
    githubUrl: "https://github.com/YashRajSahu44/Swaply",
    liveUrl: "https://n3xtg3n.xyz/",
  },
  {
    name: "Doomy",
    description:
      "A Chrome extension that helps block distracting Reels and Shorts on YouTube and Instagram, with a React interface for managing preferences.",
    stack: ["React", "Manifest V3"],
    preview: {
      type: "video",
      src: "/FocuSee%20Project%202026-10-01%2023-41-55.mp4",
      label: "Doomy demo video",
    },
    githubUrl: "https://github.com/YashRajSahu44/doomy",
    liveUrl: "https://github.com/YashRajSahu44/doomy",
  },
  {
    name: "Personal Portfolio",
    description:
      "A responsive personal portfolio showcasing projects, technical skills, certifications, and experience, built with reusable React components.",
    stack: ["React", "CSS"],
    preview: {
      type: "image",
      src: "/portfolio-preview.png",
      alt: "Personal portfolio homepage",
    },
    githubUrl: "https://github.com/YashRajSahu44/portfolio",
    liveUrl: "https://yashraj-nu.vercel.app",
  },
  {
    name: "TaxWise",
    description:
      "A clean, brutalist-styled income tax calculator for India's New Tax Regime (FY 2025–26), providing quick estimates from annual income.",
    stack: ["JavaScript"],
    preview: { type: "image", src: "/taxwise-preview.png", alt: "TaxWise calculator interface" },
    githubUrl: "https://github.com/YashRajSahu44/TaxWise",
    liveUrl: "https://yashrajsahu44.github.io/TaxWise/",
  },
];

function ProjectPreview({ preview, name }) {
  if (preview.type === "video") {
    return (
      <video
        aria-label={preview.label}
        className="h-full w-full object-cover"
        src={preview.src}
        autoPlay
        controls
        loop
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      className="h-full w-full object-cover object-top"
      src={preview.src}
      alt={preview.alt}
      loading="lazy"
      decoding="async"
      aria-label={`${name} project preview`}
    />
  );
}

function Projects() {
  return (
    <PageShell>
      <PageTitle eyebrow="Projects" title="Things I've" accent="built." />
      <div className="space-y-8">
        {projects.map((project, i) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="overflow-hidden border border-border bg-secondary/40 p-4 sm:p-6"
          >
            <div className="aspect-video overflow-hidden border border-border bg-card">
              <ProjectPreview preview={project.preview} name={project.name} />
            </div>

            <div className="pt-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-sans text-2xl font-medium uppercase tracking-wide sm:text-3xl">
                  {project.name}
                </h2>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="my-4 border-t border-border" />
              <p className="text-base leading-7 text-muted-foreground sm:text-lg">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((technology) => (
                  <span
                    key={technology}
                    className="border border-border px-2.5 py-1 text-xs uppercase tracking-wide text-muted-foreground"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex min-h-12 items-center justify-center gap-2 border border-border px-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              >
                Open project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
