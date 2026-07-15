import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { PageShell } from "@/components/PageShell";
import meAsset from "@/assets/me.png.asset.json";
import sanjiAsset from "@/assets/sanji.jpg.asset.json";
import handsImg from "@/assets/hands.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yash — Portfolio" },
      { name: "description", content: "Hi, I'm Yash — an 18-year-old engineering student curious about backend, ML and beautiful UI." },
    ],
  }),
  component: Home,
});

function Home() {
  const [showReal, setShowReal] = useState(false);
  const avatar = showReal ? meAsset.url : sanjiAsset.url;

  return (
    <PageShell>
      {/* reaching hands — Creation of Adam style flourish */}
      <motion.img
        src={handsImg}
        alt=""
        aria-hidden
        width={1600}
        height={704}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
        className="mx-auto mb-6 block h-auto w-full max-w-3xl select-none dark:invert"
      />

      <div className="max-w-3xl">
        <p className="mb-4 font-hand text-2xl text-muted-foreground">hello there,</p>
        <h1 className="font-display text-4xl leading-[1.15] md:text-6xl">
          My name is{" "}
          <button
            onClick={() => setShowReal((s) => !s)}
            className="group inline-flex items-center gap-2 align-middle"
            aria-label="Toggle avatar"
          >
            <motion.img
              key={avatar}
              src={avatar}
              alt="Yash"
              width={64}
              height={64}
              initial={{ scale: 0.4, rotate: -25, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="inline-block h-12 w-12 rounded-full border-2 border-ink object-cover shadow-md md:h-16 md:w-16"
            />
          </button>{" "}
          <span className="italic">Yash</span>. I'm an{" "}
          <span className="highlight-marker">18-year-old engineering student</span>, Minecraft veteran{" "}
          <span className="text-muted-foreground">(10+ yrs)</span>, and a curious mind deep into{" "}
          <span className="highlight-marker">backend</span> &{" "}
          <span className="highlight-marker">ML</span>. I love crafting responsive UI/UX too.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Outside of studying — anime, video games, music, or roaming down to some mountain 🏔️.
          Currently balancing academics, code, and the never-ending anime bucket list.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
          <Link to="/projects" className="ink-underline font-medium">See my projects →</Link>
          <Link to="/contact" className="ink-underline text-muted-foreground">Get in touch</Link>
          <span className="ml-auto hidden text-xs text-muted-foreground md:inline">
            psst — tap the face
          </span>
        </div>
      </div>
    </PageShell>
  );
}
