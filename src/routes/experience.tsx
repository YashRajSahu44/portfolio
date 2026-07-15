import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/experience")({
  head: () => ({ meta: [{ title: "Experience — Aditya" }] }),
  component: Experience,
});

function Experience() {
  return (
    <PageShell>
      <PageTitle eyebrow="Experience" title="Where I've" accent="been." />
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
        <p className="font-hand text-3xl text-muted-foreground">Coming soon 🌱</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Roles, internships and collaborations will appear here.
        </p>
      </div>
    </PageShell>
  );
}
