import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

const links = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About Me" },
  { to: "/certifications", label: "Certifications" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="relative z-40 flex items-center justify-between px-8 py-6 md:px-14">
      <Link to="/" className="font-display text-2xl italic tracking-tight">
        Aditya<span className="text-accent">.</span>
      </Link>
      <nav className="hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="nav-link ink-underline"
            activeProps={{ "data-status": "active" } as never}
          >
            {l.label}
          </Link>
        ))}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </nav>
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden"
      >
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
    </header>
  );
}

export function MobileNav() {
  return (
    <nav className="flex flex-wrap gap-x-5 gap-y-2 px-8 pb-4 md:hidden">
      {links.map((l) => (
        <Link key={l.to} to={l.to} className="nav-link ink-underline" activeProps={{ "data-status": "active" } as never}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
