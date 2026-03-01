"use client";

import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { projects as allProjects } from "@/lib/data";
import type { Project } from "@/types";

/* ─── Accent palette (same as homepage) ──────────────────────────────────── */
const ACCENT: Record<string, { panel: string; dot: string; tagBg: string; tagBorder: string; glyph: string }> = {
 
  "tendza-ai":         { panel: "linear-gradient(140deg,#1e1b4b,#312e81,#0f172a)", dot: "#a78bfa", tagBg: "rgba(167,139,250,0.15)", tagBorder: "rgba(167,139,250,0.3)", glyph: "AI"  },
   "ats-resume":        { panel: "linear-gradient(140deg,#0c1a2e,#1a3a6e,#0a1020)", dot: "#60a5fa", tagBg: "rgba(96,165,250,0.15)",  tagBorder: "rgba(96,165,250,0.3)",  glyph: "ATS" },
  "plumbee-db":        { panel: "linear-gradient(140deg,#0a2318,#1e3a2f,#0a1a10)", dot: "#34d399", tagBg: "rgba(52,211,153,0.15)",  tagBorder: "rgba(52,211,153,0.3)",  glyph: "DB"  },
  "portfolio-v2":      { panel: "linear-gradient(140deg,#1e1b4b,#4c1d95,#1e1040)", dot: "#2dd4bf", tagBg: "rgba(45,212,191,0.15)",  tagBorder: "rgba(45,212,191,0.3)",  glyph: "UI"  },
  "ml-models":         { panel: "linear-gradient(140deg,#1a1000,#2d1f00,#1a1000)", dot: "#fbbf24", tagBg: "rgba(251,191,36,0.15)",  tagBorder: "rgba(251,191,36,0.3)",  glyph: "ML"  },
  "mobile-app":        { panel: "linear-gradient(140deg,#1a0a2e,#2d1a5c,#0f0720)", dot: "#f472b6", tagBg: "rgba(244,114,182,0.15)", tagBorder: "rgba(244,114,182,0.3)", glyph: "APP" },
  "django-api":        { panel: "linear-gradient(140deg,#0a2010,#1a4020,#081508)", dot: "#4ade80", tagBg: "rgba(74,222,128,0.15)",  tagBorder: "rgba(74,222,128,0.3)",  glyph: "API" },
  "laravel-ecommerce": { panel: "linear-gradient(140deg,#2a0a0a,#5c1a1a,#1a0808)", dot: "#f87171", tagBg: "rgba(248,113,113,0.15)", tagBorder: "rgba(248,113,113,0.3)", glyph: "E/C" },
};
const FALLBACK = ACCENT["tendza-ai"];

const ALL_TAGS = ["All", ...Array.from(new Set(allProjects.map(p => p.tag)))];

/* ─── Hover-expand list row ──────────────────────────────────────────────── */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const acc = ACCENT[project.id] ?? FALLBACK;

  return (
    <a
      href={project.hasLiveDemo && project.liveUrl ? project.liveUrl : project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block w-full"
      style={{ textDecoration: "none" }}
    >
      <div
        className="relative overflow-hidden transition-all duration-500"
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: hovered ? 28 : 20,
          paddingBottom: hovered ? 28 : 20,
          paddingLeft: "clamp(16px,3vw,40px)",
          paddingRight: "clamp(16px,3vw,40px)",
          background: hovered ? "var(--card-bg)" : "transparent",
          borderRadius: hovered ? 16 : 0,
          marginLeft: hovered ? -16 : 0,
          marginRight: hovered ? -16 : 0,
          cursor: "pointer",
        }}
      >
        {/* Accent line on left edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-300"
          style={{
            background: hovered ? acc.dot : "transparent",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Main row */}
        <div className="flex items-center gap-6">
          {/* Index */}
          <span
            className="shrink-0 font-mono font-bold leading-none transition-colors duration-300"
            style={{
              fontSize: "clamp(13px,1.2vw,15px)",
              color: hovered ? acc.dot : "var(--text-muted)",
              minWidth: 28,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Title */}
          <h3
            className="flex-1 font-serif font-bold leading-snug tracking-tight transition-colors duration-200"
            style={{
              fontSize: "clamp(18px,2.2vw,28px)",
              color: hovered ? "var(--text)" : "var(--text)",
            }}
          >
            {project.title}
          </h3>

          {/* Tag + live badge — centre */}
          <div className="hidden items-center gap-2 md:flex">
            <span
              className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[1.5px]"
              style={{ color: acc.dot, background: acc.tagBg, border: `1px solid ${acc.tagBorder}` }}
            >
              {project.tag}
            </span>
            {project.hasLiveDemo && (
              <span
                className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px]"
                style={{ color: "var(--teal)", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.22)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--teal)", animation: "pulseGlow 2s infinite" }} />
                Live
              </span>
            )}
          </div>

          {/* Arrow */}
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="shrink-0 transition-all duration-300"
            style={{
              color: hovered ? acc.dot : "var(--text-muted)",
              transform: hovered ? "translateX(4px) rotate(-45deg)" : "none",
            }}
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>

        {/* Expanded detail — only shows on hover */}
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: hovered ? 200 : 0,
            opacity: hovered ? 1 : 0,
          }}
        >
          <div className="mt-4 flex items-start justify-between gap-8">
            <div className="flex-1">
              <p className="mb-4 text-[13px] leading-[1.75]" style={{ color: "var(--text-dim)", maxWidth: 560 }}>
                {project.longDescription ?? project.description}
              </p>
              {project.techStack && (
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map(t => (
                    <span key={t} className="rounded-lg px-2.5 py-0.5 font-mono text-[10px]"
                      style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-border)", color: "var(--card-text-muted)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Mini visual panel */}
            <div
              className="hidden h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl md:flex"
              style={{ background: acc.panel }}
            >
              <span className="select-none font-serif font-bold"
                style={{ fontSize: 36, color: "rgba(255,255,255,0.18)", letterSpacing: -2 }}>
                {acc.glyph}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ─── Featured hero card (first project) ────────────────────────────────── */
function FeaturedCard({ project }: { project: Project }) {
  const acc = ACCENT[project.id] ?? FALLBACK;

  return (
    <div
      className="mb-16 overflow-hidden rounded-[24px]"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "var(--card-shadow-lg)",
        minHeight: 320,
      }}
    >
      <div className="flex h-full flex-col md:flex-row">
        {/* Content */}
        <div className="flex flex-1 flex-col p-8 md:p-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: "var(--brand)" }}>
              Featured
            </span>
            <span className="h-px flex-1" style={{ background: "var(--border)" }} />
            <span className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[1.5px]"
              style={{ color: acc.dot, background: acc.tagBg, border: `1px solid ${acc.tagBorder}` }}>
              {project.tag}
            </span>
            {project.hasLiveDemo && (
              <span className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px]"
                style={{ color: "var(--teal)", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.22)" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--teal)", animation: "pulseGlow 2s infinite" }} />
                Live
              </span>
            )}
          </div>

          <h2 className="mb-4 font-serif font-bold leading-[1.04] tracking-tight"
            style={{ fontSize: "clamp(28px,4vw,52px)", color: "var(--text)" }}>
            {project.title}
          </h2>

          <p className="mb-6 text-[15px] leading-[1.75]" style={{ color: "var(--text-dim)", maxWidth: 520 }}>
            {project.longDescription ?? project.description}
          </p>

          {project.techStack && (
            <div className="mb-auto flex flex-wrap gap-2">
              {project.techStack.map(t => (
                <span key={t} className="rounded-lg px-3 py-1 font-mono text-[11px]"
                  style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-border)", color: "var(--card-text-muted)" }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[12px] transition-all duration-150"
              style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-border)", color: "var(--card-text-dim)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--brand)"; el.style.color = "#fff"; el.style.borderColor = "var(--brand)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--chip-bg)"; el.style.color = "var(--card-text-dim)"; el.style.borderColor = "var(--chip-border)"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.56C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            {project.hasLiveDemo && project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[12px] text-white transition-shadow duration-150"
                style={{ background: "var(--brand)", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 32px rgba(99,102,241,0.6)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(99,102,241,0.35)")}
              >
                View Live
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Visual panel */}
        <div className="relative flex h-48 items-center justify-center overflow-hidden md:h-auto md:w-72"
          style={{ background: acc.panel, flexShrink: 0 }}>
          <div className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
          <span className="select-none font-serif font-bold"
            style={{ fontSize: "clamp(64px,10vw,120px)", color: "rgba(255,255,255,0.09)", letterSpacing: -4 }}>
            {acc.glyph}
          </span>
          <div className="absolute bottom-4 right-4 rounded-xl px-3 py-1 font-mono text-[10px]"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.65)" }}>
            {project.language}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function WorkPage() {
  const [activeTag, setActiveTag] = useState("All");
  const filtered = activeTag === "All" ? allProjects : allProjects.filter(p => p.tag === activeTag);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 grid-texture" />
      <Navbar />

      {/* ── Hero header ──────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ paddingTop: "clamp(110px,16vh,160px)", paddingBottom: 60 }}
      >
        {/* Big background text */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-serif font-bold leading-none select-none"
          style={{ fontSize: "clamp(80px,18vw,240px)", color: "var(--border-sub)", letterSpacing: -8 }}
        >
          WORK
        </div>

        <div className="relative px-[clamp(20px,5vw,80px)] text-center">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center justify-center gap-3">
              <a href="/"
                className="flex items-center gap-1.5 font-mono text-[11px] transition-colors duration-150"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--brand)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Home
              </a>
              <span style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px]" style={{ color: "var(--brand)" }}>Work</span>
            </div>

            <h1
              className="font-serif font-bold leading-[0.96] tracking-tight"
              style={{ fontSize: "clamp(42px,7vw,80px)", color: "var(--text)" }}
            >
              {allProjects.length} projects.
              <br />
              <span className="text-gradient">Every one ships.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
              From AI tools to e-commerce platforms — built in Nairobi, deployed worldwide.
            </p>

            {/* Stats row — centred */}
            <div className="mt-8 flex justify-center gap-10">
              {[
                { value: `${allProjects.filter(p => p.hasLiveDemo).length}`, label: "Live" },
                { value: `${allProjects.filter(p => p.tag === "AI" || p.tag === "ML").length}`, label: "AI / ML" },
                { value: "5+", label: "Languages" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-serif text-[28px] font-bold leading-none" style={{ color: "var(--brand)" }}>{value}</div>
                  <div className="mt-0.5 font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter tabs ──────────────────────────────────────────────── */}
      <div className="px-[clamp(20px,5vw,80px)] pb-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-2">
            {ALL_TAGS.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)}
                className="rounded-xl px-4 py-2 font-mono text-[12px] transition-all duration-150"
                style={{
                  background: activeTag === tag ? "var(--brand)" : "var(--chip-bg)",
                  border: `1px solid ${activeTag === tag ? "var(--brand)" : "var(--chip-border)"}`,
                  color: activeTag === tag ? "#fff" : "var(--chip-text)",
                  boxShadow: activeTag === tag ? "0 2px 16px rgba(99,102,241,0.35)" : "none",
                }}>
                {tag}
                {tag !== "All" && (
                  <span className="ml-1.5 opacity-60">
                    {allProjects.filter(p => p.tag === tag).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Project list ─────────────────────────────────────────────── */}
      <div className="px-[clamp(20px,5vw,80px)] pb-24">
        <div className="mx-auto max-w-4xl">
          {filtered.length === 0 ? (
            <p className="py-20 text-center font-mono text-[14px]" style={{ color: "var(--text-muted)" }}>
              No projects in this category yet.
            </p>
          ) : (
            <>
              {/* Featured hero card */}
              {featured && <FeaturedCard key={featured.id} project={featured} />}

              {/* Rest as hover-expand rows */}
              {rest.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: "var(--text-muted)" }}>
                      More projects
                    </span>
                    <span className="h-px flex-1" style={{ background: "var(--border)" }} />
                  </div>
                  {rest.map((project, i) => (
                    <ProjectRow key={project.id} project={project} index={i + 1} />
                  ))}
                  {/* Close last border */}
                  <div style={{ borderTop: "1px solid var(--border)" }} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── CTA strip ────────────────────────────────────────────────── */}
      <div
        className="px-[clamp(20px,5vw,80px)] py-16"
        style={{ borderTop: "1px solid var(--border)", background: "var(--bg-elevated)" }}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-serif text-[22px] font-bold" style={{ color: "var(--text)" }}>
              Got a project in mind?
            </h3>
            <p className="mt-1 text-[14px]" style={{ color: "var(--text-muted)" }}>
              I&apos;m open to freelance and full-time opportunities.
            </p>
          </div>
          <a
            href="/contact"
            className="rounded-xl px-7 py-3.5 font-mono text-[13px] font-semibold text-white transition-shadow duration-150"
            style={{ background: "var(--brand)", boxShadow: "0 4px 20px rgba(99,102,241,0.3)", whiteSpace: "nowrap" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 36px rgba(99,102,241,0.55)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(99,102,241,0.3)")}
          >
            Let&apos;s work together →
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
