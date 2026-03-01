"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/lib/data";

const NAV_LINKS = [
  { label: "Home",    href: "/" },
  { label: "Work",    href: "/work" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const path = usePathname();

  return (
    <nav className="nav-glass fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between px-[clamp(20px,5vw,80px)]">
      <Link href="/" className="font-mono text-[13px] font-bold tracking-[3px]" style={{ color: "var(--brand)" }}>
        {"<EM />"}
      </Link>

      <div className="flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="font-sans text-[13px] tracking-wide transition-colors duration-150"
            style={{ color: path === href ? "var(--brand)" : "var(--text-muted)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = path === href ? "var(--brand)" : "var(--text)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = path === href ? "var(--brand)" : "var(--text-muted)")}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a
          href={`mailto:${siteConfig.email}`}
          data-magnetic
          className="rounded-lg px-4 py-2 font-mono text-[12px] font-semibold text-white transition-shadow"
          style={{ background: "var(--brand)", boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(99,102,241,0.55)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(99,102,241,0.3)")}
        >
          Hire me
        </a>
      </div>
    </nav>
  );
}
