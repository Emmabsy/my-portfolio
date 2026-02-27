import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-[clamp(20px,5vw,80px)] py-8"
      style={{ borderTop: "1px solid var(--border)" }}>
      <span className="font-mono text-[12px]" style={{ color: "var(--text-muted)" }}>
        © {new Date().getFullYear()} Emma Maikuri — Nairobi, Kenya
      </span>
      <nav className="flex gap-6">
        {[
          { l: "GitHub",   h: siteConfig.socials.github },
          { l: "LinkedIn", h: siteConfig.socials.linkedin },
          { l: "Email",    h: `mailto:${siteConfig.email}` },
        ].map(({ l, h }) => h ? (
          <a key={l} href={h} target={h.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
            className="font-mono text-[12px] transition-colors hover:text-indigo-glow"
            style={{ color: "var(--text-muted)" }}>
            {l}
          </a>
        ) : null)}
      </nav>
    </footer>
  );
}
