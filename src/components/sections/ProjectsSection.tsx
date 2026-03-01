"use client";

import { useEffect, useRef } from "react";
import { featuredProjects } from "@/lib/data";
import type { Project } from "@/types";

const ACCENT: Record<string, { panel: string; dot: string; tagBg: string; tagBorder: string; glyph: string; year: string }> = {
  "ats-resume":        { panel: "linear-gradient(140deg,#0c1a2e,#1a3a6e,#0a1020)", dot: "#60a5fa", tagBg: "rgba(96,165,250,0.15)",  tagBorder: "rgba(96,165,250,0.3)",  glyph: "ATS", year: "2025" },
  "tendza-ai":         { panel: "linear-gradient(140deg,#1e1b4b,#312e81,#0f172a)", dot: "#a78bfa", tagBg: "rgba(167,139,250,0.15)", tagBorder: "rgba(167,139,250,0.3)", glyph: "AI",  year: "2024" },
  "plumbee-db":        { panel: "linear-gradient(140deg,#0a2318,#1e3a2f,#0a1a10)", dot: "#34d399", tagBg: "rgba(52,211,153,0.15)",  tagBorder: "rgba(52,211,153,0.3)",  glyph: "DB",  year: "2023" },
  "portfolio-v2":      { panel: "linear-gradient(140deg,#1e1b4b,#4c1d95,#1e1040)", dot: "#2dd4bf", tagBg: "rgba(45,212,191,0.15)",  tagBorder: "rgba(45,212,191,0.3)",  glyph: "UI",  year: "2025" },
  "ml-models":         { panel: "linear-gradient(140deg,#1a1000,#2d1f00,#1a1000)", dot: "#fbbf24", tagBg: "rgba(251,191,36,0.15)",  tagBorder: "rgba(251,191,36,0.3)",  glyph: "ML",  year: "2023" },
  "mobile-app":        { panel: "linear-gradient(140deg,#1a0a2e,#2d1a5c,#0f0720)", dot: "#f472b6", tagBg: "rgba(244,114,182,0.15)", tagBorder: "rgba(244,114,182,0.3)", glyph: "APP", year: "2024" },
  "django-api":        { panel: "linear-gradient(140deg,#0a2010,#1a4020,#081508)", dot: "#4ade80", tagBg: "rgba(74,222,128,0.15)",  tagBorder: "rgba(74,222,128,0.3)",  glyph: "API", year: "2023" },
"laravel-ecommerce": { panel: "linear-gradient(140deg,#2a0a0a,#5c1a1a,#1a0808)", dot: "#f87171", tagBg: "rgba(248,113,113,0.15)", tagBorder: "rgba(248,113,113,0.3)", glyph: "E/C", year: "2022" },
"ai-chatbot":          { panel: "linear-gradient(140deg,#0c1a2e,#0a2a4e,#050f1a)", dot: "#38bdf8", tagBg: "rgba(56,189,248,0.15)",  tagBorder: "rgba(56,189,248,0.3)",  glyph: "BOT",  year: "2025" },
  "automation-scripts":  { panel: "linear-gradient(140deg,#1a100a,#3d2010,#1a0a00)", dot: "#fb923c", tagBg: "rgba(251,146,60,0.15)",  tagBorder: "rgba(251,146,60,0.3)",  glyph: "⚙",   year: "2024" },
  "nextjs-saas-starter": { panel: "linear-gradient(140deg,#0f172a,#1e2a4a,#0a0f20)", dot: "#818cf8", tagBg: "rgba(129,140,248,0.15)", tagBorder: "rgba(129,140,248,0.3)", glyph: "SaaS", year: "2024" },
  "flutter-finance":     { panel: "linear-gradient(140deg,#001a2e,#00344e,#001020)", dot: "#22d3ee", tagBg: "rgba(34,211,238,0.15)",  tagBorder: "rgba(34,211,238,0.3)",  glyph: "₣",   year: "2024" },
};

const FALLBACK = ACCENT["tendza-ai"];

const CARD_H = 480;
const NAV_H  = 64;

export function ProjectsSection() {
  const projects   = featuredProjects;
  const N          = projects.length;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const onScroll = () => {
      const rect      = wrapper.getBoundingClientRect();
      const scrolled  = -rect.top;
      const exitCount = N - 1;
      const maxScroll = exitCount * window.innerHeight;
      const progress  = Math.max(0, Math.min(1, scrolled / maxScroll));
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        if (i === N - 1) { card.style.transform = "translateY(0)"; card.style.zIndex = "10"; return; }
        const s0    = i / exitCount;
        const s1    = (i + 1) / exitCount;
        const t     = Math.max(0, Math.min(1, (progress - s0) / (s1 - s0)));
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        card.style.transform  = `translateY(${-(eased * 110)}%)`;
        card.style.zIndex     = String((N - i) * 10);
        card.style.willChange = "transform";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [N]);

  return (
    <section id="work">
      {/* Header */}
      <div className="px-[clamp(16px,5vw,80px)] pb-10 pt-16 text-center sm:pb-12 sm:pt-20">
        <span className="mb-3 block font-mono text-[10px] uppercase tracking-[4px]" style={{ color: "var(--brand)" }}>
          // 02. Selected Work
        </span>
        <h2 className="font-serif font-bold leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(26px,5vw,52px)", color: "var(--text)" }}>
          Things I&apos;ve <span className="text-gradient">built.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xs text-[13px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Scroll to flip through {N} projects.
        </p>
      </div>

      {/* Runway */}
      <div ref={wrapperRef} style={{ height: `${N * 100}vh` }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: NAV_H, paddingBottom: 16, boxSizing: "border-box" }}>
          <div style={{ width: "100%", maxWidth: 1040, padding: "0 clamp(12px,3vw,48px)" }}>

            {/* Clip container — cards slide out of this */}
            <div style={{ position: "relative", height: CARD_H, overflow: "hidden", borderRadius: 22 }}>
              {projects.map((project, i) => {
                const acc = ACCENT[project.id] ?? FALLBACK;
                return (
                  <div key={project.id} ref={el => { cardRefs.current[i] = el; }} style={{ position: "absolute", inset: 0 }}>
                    <div className="flex h-full w-full overflow-hidden rounded-[22px]"
                      style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", boxShadow: "var(--card-shadow-lg)" }}>

                      {/* ── Left: content ── */}
                      <div className="flex flex-1 flex-col p-5 sm:p-7 md:p-9">
                        {/* Number + tags */}
                        <div className="mb-3 flex items-center justify-between">
                          <span className="select-none font-mono font-bold leading-none"
                            style={{ fontSize: "clamp(24px,4vw,48px)", color: acc.dot, opacity: 0.2 }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[2px] sm:px-3 sm:py-1 sm:text-[10px]"
                              style={{ color: acc.dot, background: acc.tagBg, border: `1px solid ${acc.tagBorder}` }}>
                              {project.tag}
                            </span>
                            {project.hasLiveDemo && (
                              <span className="flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] sm:gap-1.5 sm:px-2.5 sm:text-[10px]"
                                style={{ color: "var(--teal)", background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.22)" }}>
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--teal)", animation: "pulseGlow 2s infinite" }} />
                                Live
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="mb-2 font-serif font-bold leading-[1.05] tracking-tight"
                          style={{ fontSize: "clamp(18px,2.5vw,34px)", color: "var(--card-text)" }}>
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[12px] leading-[1.75] sm:text-[13px]"
                          style={{ color: "var(--card-text-dim)", maxWidth: 380 }}>
                          {project.description}
                        </p>

                        {/* ── Spacer with meta info — fills the gap elegantly ── */}
                        <div className="my-4 flex items-center gap-3">
                          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
                          <div className="flex items-center gap-2 font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
                            <span style={{ color: acc.dot, opacity: 0.7 }}>◆</span>
                            <span>{acc.year}</span>
                            <span>·</span>
                            <span>{project.language}</span>
                            {project.hasLiveDemo && <><span>·</span><span style={{ color: "var(--teal)" }}>Deployed</span></>}
                          </div>
                          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
                        </div>

                        {/* Tech pills */}
                        {project.techStack && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.slice(0, 5).map(t => (
                              <span key={t} className="rounded-lg px-2 py-0.5 font-mono text-[9px] sm:px-2.5 sm:text-[10px]"
                                style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-border)", color: "var(--card-text-muted)" }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Buttons — pushed to bottom */}
                        <div className="mt-auto pt-4 flex gap-2">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-mono text-[10px] transition-all duration-150 sm:gap-2 sm:px-4 sm:text-[11px]"
                            style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-border)", color: "var(--card-text-dim)" }}
                            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--brand)"; el.style.color = "#fff"; el.style.borderColor = "var(--brand)"; }}
                            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--chip-bg)"; el.style.color = "var(--card-text-dim)"; el.style.borderColor = "var(--chip-border)"; }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.56C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            GitHub
                          </a>
                          {project.hasLiveDemo && project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-mono text-[10px] text-white transition-shadow sm:gap-2 sm:px-4 sm:text-[11px]"
                              style={{ background: "var(--brand)", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}
                              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 28px rgba(99,102,241,0.6)")}
                              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(99,102,241,0.35)")}>
                              View Live
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17L17 7M7 7h10v10"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* ── Right: visual panel (hidden on small mobile) ── */}
                      <div className="relative hidden w-[30%] shrink-0 overflow-hidden sm:w-[32%] md:block"
                        style={{ background: acc.panel }}>
                        <div className="absolute inset-0"
                          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="select-none font-serif font-bold"
                            style={{ fontSize: "clamp(52px,7vw,96px)", color: "rgba(255,255,255,0.07)", letterSpacing: "-3px" }}>
                            {acc.glyph}
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4 rounded-xl px-2.5 py-1 font-mono text-[10px]"
                          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>
                          {project.language}
                        </div>
                        <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full"
                          style={{ background: `radial-gradient(circle, ${acc.tagBg.replace("0.15","0.3")}, transparent 70%)` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress + scroll hint */}
            <div className="mt-3 flex items-center justify-between px-1">
              <div className="flex gap-1.5">
                {projects.map((_, i) => (
                  <div key={i} className="rounded-full" style={{ width: 16, height: 3, background: "var(--chip-border)" }} />
                ))}
              </div>
              <span className="hidden font-mono text-[10px] sm:block" style={{ color: "var(--text-muted)" }}>
                scroll to explore
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* View all */}
      <div className="py-14 text-center">
        <a href="/work"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-mono text-[12px] font-medium transition-all duration-150 sm:px-7 sm:py-3.5 sm:text-[13px]"
          style={{ border: "1px solid var(--chip-border)", color: "var(--brand)", background: "var(--chip-bg)" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--brand)"; el.style.color = "#fff"; el.style.borderColor = "var(--brand)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--chip-bg)"; el.style.color = "var(--brand)"; el.style.borderColor = "var(--chip-border)"; }}>
          View all {N} projects
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
