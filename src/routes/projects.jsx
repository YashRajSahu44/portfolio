import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — Yash" }] }),
  component: Projects,
});

const projectDemoVideo = "/FocuSee%20Project%202026-10-01%2023-41-55.mp4";
const SmartCampus = "/smartcampus.mp4";
const portfolio = "/portfolio1.mp4";
const portfolio2 = "/portfolio2.mp4";
const taxwise = "/taxwise.mp4";

const projects = [
  {
    name: "Doomy",
    description:
      "A Chrome extension that helps block distracting Reels and Shorts on YouTube and Instagram, with a React interface for managing preferences.",
    stack: ["React", "Manifest V3"],
    preview: {
      type: "video",
      src: projectDemoVideo,
      poster: "/doomy-poster.jpg",
      label: "Doomy demo video",
    },
    githubUrl: "https://github.com/YashRajSahu44/doomy",
    liveUrl: "https://github.com/YashRajSahu44/doomy",
  },
  {
    name: "Portfolio 2",
    description:
      "A second-generation personal portfolio focused on clean storytelling, smoother motion, and a sharper design system for presenting work and credentials.",
    stack: ["React", "Tailwind", "Motion"],
    preview: {
      type: "video",
      src: portfolio2,
      poster: "/portfolio-preview.png",
      label: "Portfolio 2 demo video",
    },
    githubUrl: "https://github.com/YashRajSahu44/portfolio02",
    liveUrl: "https://yashraj-nu.vercel.app",
  },
  {
    name: "SmartCampus",
    description:
      "A scalable in-campus marketplace for educational institutions, streamlining resource allocation, student communication, and digital campus services.",
    stack: ["React", "Express", "MongoDB"],
    preview: {
      type: "video",
      src: SmartCampus,
      poster: "/smartcampus-preview.png",
      label: "SmartCampus project video",
    },
    githubUrl: "https://github.com/YashRajSahu44/Swaply",
    liveUrl: "https://n3xtg3n.xyz/",
  },
  {
    name: "Personal Portfolio",
    description:
      "A responsive personal portfolio showcasing projects, technical skills, certifications, and experience, built with reusable React components.",
    stack: ["React", "CSS"],
    preview: {
      type: "video",
      src: portfolio,
      poster: "/portfolio-preview.png",
      label: "Portfolio project video",
    },
    githubUrl: "https://github.com/YashRajSahu44/portfolio",
    liveUrl: "https://yashraj-nu.vercel.app",
  },
  {
    name: "TaxWise",
    description:
      "A clean, brutalist-styled income tax calculator for India's New Tax Regime (FY 2025–26), providing quick estimates from annual income.",
    stack: ["JavaScript"],
    preview: {
      type: "video",
      src: taxwise,
      poster: "/taxwise-preview.png",
      label: "TaxWise project video",
    },
    githubUrl: "https://github.com/YashRajSahu44/TaxWise",
    liveUrl: "https://yashrajsahu44.github.io/TaxWise/",
  },
];

const contributionsApiUrl = "https://github-contributions-api.jogruber.de/v4/YashRajSahu44?y=last";

function buildContributionWeeks(contributions) {
  if (contributions.length === 0) return [];

  const firstDate = new Date(`${contributions[0].date}T00:00:00Z`);
  const days = [...Array(firstDate.getUTCDay()).fill(null), ...contributions];
  const trailingDays = (7 - (days.length % 7)) % 7;
  days.push(...Array(trailingDays).fill(null));

  return Array.from({ length: days.length / 7 }, (_, weekIndex) =>
    days.slice(weekIndex * 7, weekIndex * 7 + 7),
  );
}

function ProjectPreview({ preview, name }) {
  if (preview.type === "video") {
    return (
      <video
        aria-label={preview.label}
        className="h-full w-full object-cover"
        src={preview.src}
        poster={preview.poster}
        autoPlay
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

function GitHubContributions() {
  const [contributionData, setContributionData] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(contributionsApiUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub contributions request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (
          typeof data.total?.lastYear !== "number" ||
          !Array.isArray(data.contributions) ||
          data.contributions.some(
            (day) =>
              typeof day.date !== "string" ||
              typeof day.count !== "number" ||
              typeof day.level !== "number",
          )
        ) {
          throw new Error("GitHub contributions response has an invalid shape.");
        }

        setContributionData(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.warn("Unable to load GitHub contributions:", error);
        setLoadError(true);
      });

    return () => controller.abort();
  }, []);

  const weeks = contributionData ? buildContributionWeeks(contributionData.contributions) : [];
  const levelOpacity = [0, 0.25, 0.5, 0.75, 1];

  return (
    <section
      className="mt-10 border border-border bg-card p-4 sm:p-6"
      aria-labelledby="contributions-title"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">GitHub</div>
          <h2 id="contributions-title" className="mt-2 font-display text-2xl md:text-3xl">
            Contribution graph
          </h2>
          {contributionData ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {contributionData.total.lastYear.toLocaleString()} contributions in the last year
            </p>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground" role={loadError ? "alert" : "status"}>
              {loadError ? "Contributions couldn't be loaded right now." : "Loading contributions…"}
            </p>
          )}
        </div>
        <a
          href="https://github.com/YashRajSahu44"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          View profile
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {weeks.length > 0 && (
        <div
          className="overflow-x-auto pb-2"
          role="group"
          aria-label="GitHub contributions over the last year. Select a day to view matching commits on GitHub."
        >
          <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
            {weeks.flatMap((week, weekIndex) =>
              week.map((day, dayIndex) =>
                day ? (
                  <a
                    key={day.date}
                    href={`https://github.com/search?q=${encodeURIComponent(`author:YashRajSahu44 author-date:${day.date}`)}&type=commits`}
                    target="_blank"
                    rel="noreferrer"
                    title={`${day.count} contributions on ${day.date}. View matching commits on GitHub.`}
                    aria-label={`${day.count} contributions on ${day.date}. View matching commits on GitHub.`}
                    className="h-3 w-3 rounded-[2px] border border-border/60 outline-offset-2 transition-transform hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                    style={{
                      backgroundColor:
                        day.level === 0
                          ? "var(--secondary)"
                          : `color-mix(in oklab, var(--accent) ${levelOpacity[Math.min(day.level, 4)] * 100}%, var(--secondary))`,
                    }}
                  />
                ) : (
                  <span
                    key={`empty-${weekIndex}-${dayIndex}`}
                    className="h-3 w-3"
                    aria-hidden="true"
                  />
                ),
              ),
            )}
          </div>
          <div className="mt-3 flex items-center justify-end gap-2 text-xs text-muted-foreground">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <span
                key={level}
                className="h-3 w-3 rounded-[2px] border border-border/60"
                style={{
                  backgroundColor:
                    level === 0
                      ? "var(--secondary)"
                      : `color-mix(in oklab, var(--accent) ${levelOpacity[level] * 100}%, var(--secondary))`,
                }}
                aria-hidden="true"
              />
            ))}
            <span>More</span>
          </div>
        </div>
      )}
    </section>
  );
}

function Projects() {
  return (
    <PageShell>
      <PageTitle eyebrow="Projects" title="Things I've" accent="built." />
      <div className="grid gap-6 lg:grid-cols-2">
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
                <h2 className="font-sans text-2xl font-medium uppercase tracking-wide">
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
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
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
      <GitHubContributions />
    </PageShell>
  );
}
