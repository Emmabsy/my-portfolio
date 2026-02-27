"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home",    href: "/" },
  { label: "Work",    href: "/work" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const path = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-[clamp(20px,5vw,80px)] backdrop-blur-xl"
      style={{ background: "rgba(10,14,26,0.75)", borderBottom: "1px solid var(--border)" }}
    >
      <Link href="/" className="font-mono text-[13px] font-bold tracking-[3px] text-indigo">
        {"<EM />"}
      </Link>

      <div className="flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "font-sans text-[13px] tracking-wide transition-colors",
              path === href ? "text-indigo" : "text-slate-400 hover:text-slate-100"
            )}
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
          className="rounded-lg bg-indigo px-4 py-2 font-mono text-[12px] font-semibold text-white shadow-glow transition-shadow hover:shadow-glow-lg"
        >
          Hire me
        </a>
      </div>
    </nav>
  );
}
