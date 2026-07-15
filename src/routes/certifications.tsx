import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageTitle } from "@/components/PageShell";

export const Route = createFileRoute("/certifications")({
  head: () => ({ meta: [{ title: "Certifications — Aditya" }] }),
  component: Certifications,
});

function Certifications() {
  return (
    <PageShell>
      <PageTitle eyebrow="Certifications" title="Badges &" accent="proof." />
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
        <p className="font-hand text-3xl text-muted-foreground">Space reserved ✨</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Certifications will land here once they're in hand.
        </p>
      </div>
    </PageShell>
  );
}
