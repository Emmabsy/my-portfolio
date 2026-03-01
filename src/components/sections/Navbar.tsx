"use client";

import { useState, useEffect } from "react";
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [path]);

  return (
    <>
      <nav
        className="nav-glass fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between"
        style={{ padding: "0 clamp(16px,4vw,80px)" }}
      >
        {/* Logo */}
        <Link href="/" className="font-mono text-[13px] font-bold tracking-[3px]" style={{ color: "var(--brand)" }}>
          {"<EM />"}
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-sans text-[13px] tracking-wide transition-colors duration-150"
              style={{ color: path === href ? "var(--brand)" : "var(--text-muted)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = path === href ? "var(--brand)" : "var(--text-muted)")}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <a
            href={`mailto:${siteConfig.email}`}
            className="hidden rounded-lg px-4 py-2 font-mono text-[12px] font-semibold text-white transition-shadow sm:block"
            style={{ background: "var(--brand)", boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(99,102,241,0.55)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(99,102,241,0.3)")}
          >
            Hire me
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg md:hidden"
            style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-border)" }}
          >
            <span
              className="block h-[2px] w-5 rounded-full transition-all duration-300"
              style={{
                background: "var(--text)",
                transform: open ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-[2px] w-5 rounded-full transition-all duration-300"
              style={{ background: "var(--text)", opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-[2px] w-5 rounded-full transition-all duration-300"
              style={{
                background: "var(--text)",
                transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className="fixed inset-x-0 top-16 z-40 md:hidden"
        style={{
          pointerEvents: open ? "all" : "none",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          background: "var(--card-bg)",
          borderBottom: "1px solid var(--card-border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-mono text-[14px] transition-colors"
              style={{
                color: path === href ? "var(--brand)" : "var(--text)",
                background: path === href ? "var(--chip-bg)" : "transparent",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: path === href ? "var(--brand)" : "var(--border)" }}
              />
              {label}
            </Link>
          ))}
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-2 rounded-xl px-4 py-3 text-center font-mono text-[14px] font-semibold text-white"
            style={{ background: "var(--brand)" }}
          >
            Hire me
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setOpen(false)}
          style={{ background: "rgba(0,0,0,0.2)" }}
        />
      )}
    </>
  );
}
