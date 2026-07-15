import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageTitle } from "@/components/PageShell";
import meAsset from "@/assets/me.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Yash" }, { name: "description", content: "About Yash." }] }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageTitle eyebrow="About Me" title="A little" accent="about me." />
      <div className="grid gap-10 md:grid-cols-[220px_1fr] md:items-start">
        <img
          src={meAsset.url}
          alt="Yash"
          className="h-52 w-52 rounded-2xl border-2 border-ink object-cover shadow-lg"
          loading="lazy"
        />
        <div className="space-y-5 text-base leading-relaxed text-foreground md:text-lg">
          <p>
            Hi, I'm an <span className="highlight-marker">18-year-old engineering student</span>,
            veteran in Minecraft (10+ years of experience), and a curious mind deeply interested in{" "}
            <span className="highlight-marker">backend</span> and <span className="highlight-marker">ML</span>.
            I love building cool frontends and responsive UI/UX.
          </p>
          <p>
            Outside of studying, I love watching anime, playing video games, listening to music, or
            maybe roaming down to some mountain (yeah, I love mountains 🏔️). Currently balancing
            academics, programming, and in the meantime completing my bucket list of animes.
          </p>
          <p className="font-hand text-2xl text-accent">
            I'm open to new roles, collaborations, and opportunities — feel free to reach out!
          </p>
          <Link to="/contact" className="ink-underline inline-block text-sm font-medium">
            Reach out →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
