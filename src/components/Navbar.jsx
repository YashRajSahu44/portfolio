import { Link } from "@tanstack/react-router";

const links = [
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/achievements", label: "Achievements" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="relative z-40 flex items-center justify-between px-8 py-6 md:px-14">
      <Link to="/" className="font-display text-2xl italic tracking-tight">
        Yash<span className="text-accent">.</span>
      </Link>
      <nav className="hidden items-center gap-7 md:mr-12 md:flex">
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
    </header>
  );
}

export function MobileNav() {
  return (
    <nav className="flex flex-wrap gap-x-5 gap-y-2 px-8 pb-4 pr-16 md:hidden">
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
