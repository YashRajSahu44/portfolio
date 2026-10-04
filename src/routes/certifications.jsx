import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, PageTitle } from "@/components/PageShell";
export const Route = createFileRoute("/certifications")({
  head: () => ({ meta: [{ title: "Certifications — Yash" }] }),
  component: Certifications,
});
const certs = [
  {
    title: "Certificate of Participation — Finalist of TIT Srijan Hackathon",
    issuer: "Unstop",
    issued: "Issued May 2026",
    skills: ["Hackathon", "Teamwork"],
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate",
    issuer: "Oracle",
    issued: "Issued Oct 2025",
    skills: ["AI", "Oracle Cloud"],
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    issued: "Issued Oct 2025",
    skills: ["Generative AI"],
  },
];
function Certifications() {
  return (
    <PageShell>
      <PageTitle eyebrow="Certifications" title="Badges &" accent="proof." />
      <div className="space-y-4">
        {certs.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 * i }}
            className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <h3 className="font-display text-xl leading-snug md:text-2xl">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {c.issuer} · {c.issued}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs"
                >
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
