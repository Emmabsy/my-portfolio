"use client";

import { useEffect, useRef } from "react";
import { featuredProjects } from "@/lib/data";
import type { Project } from "@/types";

const ACCENT: Record<string, { panel: string; dot: string; tagBg: string; tagBorder: string; glyph: string }> = {
  "ats-resume":        { panel: "linear-gradient(140deg,#0c1a2e,#1a3a6e,#0a1020)", dot: "#60a5fa", tagBg: "rgba(96,165,250,0.15)",  tagBorder: "rgba(96,165,250,0.3)",  glyph: "ATS" },
  "tendza-ai":         { panel: "linear-gradient(140deg,#1e1b4b,#312e81,#0f172a)", dot: "#a78bfa", tagBg: "rgba(167,139,250,0.15)", tagBorder: "rgba(167,139,250,0.3)", glyph: "AI"  },
  "plumbee-db":        { panel: "linear-gradient(140deg,#0a2318,#1e3a2f,#0a1a10)", dot: "#34d399", tagBg: "rgba(52,211,153,0.15)",  tagBorder: "rgba(52,211,153,0.3)",  glyph: "DB"  },
  "portfolio-v2":      { panel: "linear-gradient(140deg,#1e1b4b,#4c1d95,#1e1040)", dot: "#2dd4bf", tagBg: "rgba(45,212,191,0.15)",  tagBorder: "rgba(45,212,191,0.3)",  glyph: "UI"  },
  "ml-models":         { panel: "linear-gradient(140deg,#1a1000,#2d1f00,#1a1000)", dot: "#fbbf24", tagBg: "rgba(251,191,36,0.15)",  tagBorder: "rgba(251,191,36,0.3)",  glyph: "ML"  },
  "mobile-app":        { panel: "linear-gradient(140deg,#1a0a2e,#2d1a5c,#0f0720)", dot: "#f472b6", tagBg: "rgba(244,114,182,0.15)", tagBorder: "rgba(244,114,182,0.3)", glyph: "APP" },
  "django-api":        { panel: "linear-gradient(140deg,#0a2010,#1a4020,#081508)", dot: "#4ade80", tagBg: "rgba(74,222,128,0.15)",  tagBorder: "rgba(74,222,128,0.3)",  glyph: "API" },
  "laravel-ecommerce": { panel: "linear-gradient(140deg,#2a0a0a,#5c1a1a,#1a0808)", dot: "#f87171", tagBg: "rgba(248,113,113,0.15)", tagBorder: "rgba(248,113,113,0.3)", glyph: "E/C" },
};
const FALLBACK = ACCENT["tendza-ai"];

/*
 * ════════════════════════════════════════════════════════════════
 *  STICKY STACK — CORRECT ARCHITECTURE
 * ════════════════════════════════════════════════════════════════
 *
 *  HTML structure:
 *    <section>
 *      [header]
 *      <div ref=wrapperRef  height: N×100vh>       ← scroll runway
 *        <div  sticky top:0  height:100vh>          ← pins to viewport
 *          <div  relative  height:calc(100vh-96px)> ← card stage
 *            <div absolute inset:0 />  ← card 0 (z=N*10, top)
 *            <div absolute inset:0 />  ← card 1 (z=(N-1)*10)
 *            ...
 *          </div>
 *        </div>
 *      </div>
 *      [View all button]
 *    </section>
 *
 *  Why this works:
 *  • Container = N×100vh. Gives each card 100vh of scroll runway.
 *  • Sticky has height:100vh so it never releases early.
 *  • Cards are position:absolute inset:0 — they PERFECTLY overlap.
 *  • Scroll listener reads progress = -rect.top / ((N-1)×vh).
 *    Card i exits during progress segment [i/(N-1), (i+1)/(N-1)].
 *    Last card never exits (always at scale 1, opacity 1).
 *  • NO y-transform. Cards never move vertically.
 *  • NO overflow-x:hidden on body (breaks sticky). Use clip instead.
 * ════════════════════════════════════════════════════════════════
 */

const NAVBAR_H = 64; // px — height of the fixed navbar

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
      const scrolled  = -rect.top;                       // px scrolled past wrapper top
      const exitCount = N - 1;                           // last card never exits
      const maxScroll = exitCount * window.innerHeight;  // = wrapper.height - 1vh
      const progress  = Math.max(0, Math.min(1, scrolled / maxScroll));

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        if (i === N - 1) {
          // Last card — always fully visible beneath all others
          card.style.transform       = "scale(1)";
          card.style.opacity         = "1";
          card.style.zIndex          = "10";
          card.style.transformOrigin = "top center";
          return;
        }

        // Card i owns exit segment [i/exitCount, (i+1)/exitCount]
        const s0    = i / exitCount;
        const s1    = (i + 1) / exitCount;
        const raw   = (progress - s0) / (s1 - s0);
        const t     = Math.max(0, Math.min(1, raw));
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic

        const scale   = 1 - eased * 0.08;                              // 1.0 → 0.92
        const opacity = t < 0.65 ? 1 : 1 - ((t - 0.65) / 0.35);      // fade last 35%
        const zIndex  = (N - i) * 10;                                   // card 0 on top

        card.style.transform       = `scale(${scale})`;
        card.style.opacity         = String(Math.max(0, opacity));
        card.style.zIndex          = String(zIndex);
        card.style.transformOrigin = "top center";
        card.style.willChange      = "transform, opacity";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial render
    return () => window.removeEventListener("scroll", onScroll);
  }, [N]);

  return (
    <section id="work">
      {/* ── Header — normal flow, above the sticky section ── */}
      <div
        className="px-[clamp(20px,5vw,80px)] pb-10 pt-20 text-center"
      >
        <span
          className="mb-3 block font-mono text-[10px] uppercase tracking-[4px]"
          style={{ color: "var(--brand)" }}
        >
          // 02. Selected Work
        </span>
        <h2
          className="font-serif font-bold leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(28px,5vw,52px)", color: "var(--text)" }}
        >
          Things I&apos;ve <span className="text-gradient">built.</span>
        </h2>
        <p
          className="mx-auto mt-3 max-w-xs text-[13px] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll to flip through {N} projects.
        </p>
      </div>

      {/* ── Scroll runway: N × 100vh tall ── */}
      <div
        ref={wrapperRef}
        style={{ height: `${N * 100}vh` }}
      >
        {/* ── ONE sticky viewport: top:0, height:100vh ─────────────────────
            This is the element that PINS to the screen.
            height:100vh ensures it never releases early.
            top:0 means it activates the moment its parent enters the viewport.
        ─────────────────────────────────────────────────────────────────── */}
        <div
          style={{
            position:  "sticky",
            top:       0,
            height:    "100vh",
            display:   "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: `${NAVBAR_H + 12}px`,    // clear the navbar
            paddingBottom: "24px",
            boxSizing: "border-box",
          }}
        >
          {/* ── Card stage: all cards absolutely overlap here ── */}
          <div
            className="relative mx-auto w-full flex-1"
            style={{
              maxWidth: "900px",
              padding: "0 clamp(16px,4vw,40px)",
            }}
          >
            <div className="relative h-full">
              {projects.map((project, i) => {
                const acc = ACCENT[project.id] ?? FALLBACK;
                return (
                  <div
                    key={project.id}
                    ref={el => { cardRefs.current[i] = el; }}
                    style={{
                      position: "absolute",
                      top:      0,
                      left:     "clamp(16px,4vw,40px)",
                      right:    "clamp(16px,4vw,40px)",
                      bottom:   0,
                    }}
                  >
                    {/* Card */}
                    <div
                      className="flex h-full w-full overflow-hidden rounded-[22px]"
                      style={{
                        background: "var(--card-bg)",
                        border:     "1px solid var(--card-border)",
                        boxShadow:  "var(--card-shadow-lg)",
                      }}
                    >
                      {/* Content */}
                      <div className="flex flex-1 flex-col overflow-hidden p-7 md:p-10">
                        {/* Number + tags */}
                        <div className="mb-4 flex items-start justify-between">
                          <span
                            className="select-none font-mono font-bold leading-none"
                            style={{
                              fontSize: "clamp(36px,5vw,60px)",
                              color:    acc.dot,
                              opacity:  0.2,
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[2px]"
                              style={{
                                color:      acc.dot,
                                background: acc.tagBg,
                                border:     `1px solid ${acc.tagBorder}`,
                              }}
                            >
                              {project.tag}
                            </span>
                            {project.hasLiveDemo && (
                              <span
                                className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px]"
                                style={{
                                  color:      "var(--teal)",
                                  background: "rgba(45,212,191,0.1)",
                                  border:     "1px solid rgba(45,212,191,0.22)",
                                }}
                              >
                                <span
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{ background: "var(--teal)", animation: "pulseGlow 2s infinite" }}
                                />
                                Live
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h3
                          className="mb-3 font-serif font-bold leading-[1.05] tracking-tight"
                          style={{ fontSize: "clamp(22px,3vw,40px)", color: "var(--card-text)" }}
                        >
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="mb-5 text-[14px] leading-[1.8]"
                          style={{ color: "var(--card-text-dim)", maxWidth: 400 }}
                        >
                          {project.longDescription ?? project.description}
                        </p>

                        {/* Tech pills */}
                        {project.techStack && (
                          <div className="mb-auto flex flex-wrap gap-1.5">
                            {project.techStack.map(t => (
                              <span
                                key={t}
                                className="rounded-lg px-2.5 py-0.5 font-mono text-[10px]"
                                style={{
                                  background: "var(--chip-bg)",
                                  border:     "1px solid var(--chip-border)",
                                  color:      "var(--card-text-muted)",
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Buttons */}
                        <div className="mt-6 flex gap-3">
                          <a
                            href={project.githubUrl}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[12px] transition-all duration-150"
                            style={{
                              background:   "var(--chip-bg)",
                              border:       "1px solid var(--chip-border)",
                              color:        "var(--card-text-dim)",
                            }}
                            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--brand)"; el.style.color = "#fff"; el.style.borderColor = "var(--brand)"; }}
                            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--chip-bg)"; el.style.color = "var(--card-text-dim)"; el.style.borderColor = "var(--chip-border)"; }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.56C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            GitHub
                          </a>
                          {project.hasLiveDemo && project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[12px] text-white transition-shadow duration-150"
                              style={{ background: "var(--brand)", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}
                              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 28px rgba(99,102,241,0.6)")}
                              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(99,102,241,0.35)")}
                            >
                              View Live
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17L17 7M7 7h10v10"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Visual panel — always dark */}
                      <div
                        className="relative hidden w-[34%] shrink-0 overflow-hidden md:block"
                        style={{ background: acc.panel }}
                      >
                        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="select-none font-serif font-bold"
                            style={{ fontSize: "clamp(56px,8vw,108px)", color: "rgba(255,255,255,0.07)", letterSpacing: "-3px" }}
                          >
                            {acc.glyph}
                          </span>
                        </div>
                        <div
                          className="absolute bottom-5 right-5 rounded-xl px-3 py-1.5 font-mono text-[11px]"
                          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}
                        >
                          {project.language}
                        </div>
                        <div
                          className="absolute -right-8 -top-8 h-44 w-44 rounded-full"
                          style={{ background: `radial-gradient(circle, ${acc.tagBg.replace("0.15","0.3")}, transparent 70%)` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {projects.map((_, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{ width: 5, height: 5, background: "var(--chip-border)" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View all — immediately after scroll runway, no extra spacing */}
      <div className="py-14 text-center">
        <a
          href="/work"
          className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-mono text-[13px] font-medium transition-all duration-150"
          style={{ border: "1px solid var(--chip-border)", color: "var(--brand)", background: "var(--chip-bg)" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--brand)"; el.style.color = "#fff"; el.style.borderColor = "var(--brand)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--chip-bg)"; el.style.color = "var(--brand)"; el.style.borderColor = "var(--chip-border)"; }}
        >
          View all {N} projects
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
