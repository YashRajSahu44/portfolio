import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/lib/theme";

const links = [
  { to: "/projects", label: "Projects" },
  { to: "/certifications", label: "Certifications" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

function ThemeToggleButton({ theme, toggle, className }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      className={className}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Sun className="h-4 w-4" aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="relative z-40 flex items-center justify-between px-8 py-6 md:px-14">
      <Link to="/" className="font-display text-2xl italic tracking-tight">
        Yash<span className="text-accent">.</span>
      </Link>
      <nav className="hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="nav-link ink-underline"
            activeProps={{ "data-status": "active" }}
          >
            {l.label}
          </Link>
        ))}
        <ThemeToggleButton
          theme={theme}
          toggle={toggle}
          className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
        />
      </nav>
      <ThemeToggleButton
        theme={theme}
        toggle={toggle}
        className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-secondary md:hidden"
      />
    </header>
  );
}

export function MobileNav() {
  return (
    <nav className="flex flex-wrap gap-x-5 gap-y-2 px-8 pb-4 md:hidden">
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className="nav-link ink-underline"
          activeProps={{ "data-status": "active" }}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
