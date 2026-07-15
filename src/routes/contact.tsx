import { createFileRoute } from "@tanstack/react-router";
import { Github, Mail, Linkedin } from "lucide-react";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Yash" }] }),
  component: Contact,
});

const items = [
  { icon: Mail, label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  { icon: Github, label: "GitHub", value: "@aditya", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", value: "in/aditya", href: "https://linkedin.com" },
];

function Contact() {
  return (
    <PageShell>
      <PageTitle eyebrow="Contact" title="Let's" accent="talk." />
      <p className="mb-8 max-w-xl text-base text-muted-foreground md:text-lg">
        Open to new roles, collaborations and opportunities. Slide into any of these ↓
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
          >
            <Icon className="h-6 w-6 text-accent" />
            <div className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
            <div className="mt-1 font-display text-2xl">{value}</div>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
