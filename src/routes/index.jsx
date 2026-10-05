import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const animeAvatar = "/anime-avatar-default.jpg";
const realAvatar = "/yash-profile-photo.jpg";
const cvUrl = "/cv.html";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yash — Portfolio" },
      {
        name: "description",
        content:
          "Hi, I'm Yash — an 18-year-old engineering student curious about backend, ML and beautiful UI.",
      },
    ],
  }),
  component: Home,
});
function Home() {
  const [showReal, setShowReal] = useState(false);
  const avatar = showReal ? realAvatar : animeAvatar;
  const toggledOnce = useRef(false);
  const onToggle = () => {
    toggledOnce.current = true;
    setShowReal((s) => !s);
  };
  return (
    <PageShell>
      <div className="max-w-3xl">
        <p className="mb-4 font-hand text-2xl text-muted-foreground">hello there,</p>
        <h1 className="font-display text-4xl leading-[1.15] md:text-6xl">
          My name is{" "}
          <button
            onClick={onToggle}
            className="group inline-flex items-center gap-2 align-middle"
            aria-label="Toggle avatar"
          >
            <motion.img
              key={avatar}
              src={avatar}
              alt={showReal ? "Yash" : "Anime avatar"}
              width={64}
              height={64}
              initial={{ scale: 0.4, rotate: -25, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="inline-block h-12 w-12 rounded-full border-2 border-ink object-cover shadow-md md:h-16 md:w-16"
            />
          </button>{" "}
          <span className="italic">Yash</span>. I'm an{" "}
          <span className="highlight-marker">18-year-old engineering student</span>, a Minecraft
          veteran <span className="text-muted-foreground">(10+ yrs)</span>, and a curious mind deep
          into <span className="highlight-marker">backend</span> &{" "}
          <span className="highlight-marker">ML</span>. I love crafting responsive UI/UX too.
        </h1>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground md:text-lg">
          <p>
            Building scalable frontend systems and modern web experiences with a strong focus on
            performance-focused engineering
          </p>
          <p className="font-hand text-2xl text-accent">
            I'm open to new roles, collaborations, and opportunities — feel free to reach out!
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
          <Link to="/projects" className="ink-underline font-medium">
            See my projects →
          </Link>
          <Link to="/contact" className="ink-underline text-muted-foreground">
            Get in touch
          </Link>
          <a
            href={cvUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-medium transition-colors hover:bg-secondary"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV
          </a>
          <span className="ml-auto hidden text-xs text-muted-foreground md:inline">
            psst — tap the face
          </span>
        </div>
      </div>
    </PageShell>
  );
}
