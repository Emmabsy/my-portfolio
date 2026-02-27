"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { projects } from "@/lib/data";
import { formatCount } from "@/lib/utils";
import type { Project } from "@/types";

const LANG_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#d4a017",
  Python:     "#3572a5",
  Rust:       "#e05d44",
  Go:         "#00add8",
};

const TAG_STYLE: Record<string, { text: string; bg: string; border: string }> = {
  ML:       { text: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.28)" },
  Frontend: { text: "#2dd4bf", bg: "rgba(45,212,191,0.12)",  border: "rgba(45,212,191,0.28)"  },
  Systems:  { text: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.28)"  },
  DevOps:   { text: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.28)"  },
  Mobile:   { text: "#f472b6", bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.28)" },
  OSS:      { text: "#818cf8", bg: "rgba(129,140,248,0.12)", border: "rgba(129,140,248,0.28)" },
};

// How many px of scroll runway each card gets
const CARD_SCROLL_PX = 600;

// ─── Single card ──────────────────────────────────────────────────────────────
function StackCard({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const tag = TAG_STYLE[project.tag] ?? TAG_STYLE["OSS"];

  /*
   * Each card "owns" the segment [i/total … (i+1)/total] of the container scroll.
   * While in its segment the card is full-size and opaque.
   * At the end of its segment it shrinks + fades, revealing the card behind it.
   * Because z-index = total - index, card 0 is always on top first.
   */
  const segStart = index / total;
  const segEnd   = (index + 1) / total;

  const scale   = useTransform(scrollYProgress, [segStart, segEnd], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [segStart, segEnd - 0.04, segEnd], [1, 0.95, 0]);
  const y       = useTransform(scrollYProgress, [segStart, segEnd], [0, -50]);

  return (
    <motion.div
      style={{
        position: "sticky",
        top: 80,                        // all cards stick at same position
        zIndex: total - index,          // card 0 highest → appears on top first
        scale,
        opacity,
        y,
        transformOrigin: "top center",
        /* Peek offset — each card below is offset slightly so the stack is visible */
        marginTop: index === 0 ? 0 : -8,
      }}
    >
      {/* ── Dark card shell (always dark, regardless of page theme) ── */}
      <div
        className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl"
        style={{
          /* Explicit dark — never inherits page background */
          background: "linear-gradient(150deg, #1c1b30 0%, #13121f 60%, #0f0e1c 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 2px 0 rgba(255,255,255,0.06) inset, " +
            "0 40px 100px rgba(0,0,0,0.55), " +
            "0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Coloured top-edge accent */}
        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg, transparent 0%, ${tag.text}80 35%, ${tag.text}80 65%, transparent 100%)`,
          }}
        />

        {/* Ambient glow blob */}
        <div
          className="pointer-events-none absolute -right-14 -top-14 h-72 w-72 rounded-full"
          style={{ background: `radial-gradient(circle, ${tag.bg.replace("0.12", "0.2")}, transparent 70%)` }}
        />

        <div className="relative p-8 md:p-10">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[2px]"
                style={{ color: tag.text, background: tag.bg, border: `1px solid ${tag.border}` }}
              >
                {project.tag}
              </span>
              {project.hasLiveDemo && (
                <span
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px]"
                  style={{
                    color: "#2dd4bf",
                    background: "rgba(45,212,191,0.08)",
                    border: "1px solid rgba(45,212,191,0.22)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "#2dd4bf", animation: "pulseGlow 2s ease-in-out infinite" }}
                  />
                  Live
                </span>
              )}
            </div>
            <span className="shrink-0 font-mono text-[12px]" style={{ color: "#334155" }}>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Title */}
          <h3
            className="mb-4 font-serif font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(28px, 4.5vw, 44px)", color: "#f1f5f9" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="mb-8 max-w-lg text-[14px] leading-[1.85]"
            style={{ color: "#94a3b8" }}
          >
            {project.longDescription ?? project.description}
          </p>

          {/* Tech stack */}
          {project.techStack && (
            <div className="mb-8 flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-lg px-3 py-1 font-mono text-[11px]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#94a3b8",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Footer: stats + buttons */}
          <div
            className="flex flex-wrap items-center justify-between gap-4 border-t pt-6"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-5 font-mono text-[12px]" style={{ color: "#475569" }}>
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: LANG_COLOR[project.language] ?? "#888" }}
                />
                {project.language}
              </span>
              {project.stars > 0 && <span>⭐ {formatCount(project.stars)}</span>}
              {project.forks  > 0 && <span>⑂ {project.forks}</span>}
            </div>

            <div className="flex gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[12px] transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "#94a3b8",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "#f1f5f9";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.56C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              {project.hasLiveDemo && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[12px] text-white"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                    boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 30px rgba(99,102,241,0.55)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(99,102,241,0.3)")}
                >
                  View Live
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  /*
   * scrollYProgress goes 0 → 1 as the user scrolls from the top of this
   * container to the bottom. Container height = N cards × CARD_SCROLL_PX,
   * so each card gets CARD_SCROLL_PX worth of scroll runway.
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>

      {/* ── Centred header ── */}
      <div
        className="px-[clamp(20px,5vw,80px)] text-center"
        style={{ marginBottom: "4rem" }}
      >
        <span
          className="mb-3 block font-mono text-[10px] uppercase tracking-[4px]"
          style={{ color: "var(--indigo)" }}
        >
          // 02. Selected Work
        </span>
        <h2
          className="font-serif font-bold leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(28px, 5vw, 52px)", color: "var(--text-primary)" }}
        >
          Things I&apos;ve{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #2dd4bf)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            built.
          </span>
        </h2>
        <p
          className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll through — each card peels away to reveal the next.
        </p>
      </div>

      {/*
       * ── Stacking scroll container ──
       *
       * Height = N × CARD_SCROLL_PX.  The cards use `position: sticky`
       * so they all pin at top:80px.  As you scroll, each card gets
       * transformed out via its own scrollYProgress segment.
       */}
      <div
        ref={containerRef}
        className="relative px-[clamp(16px,4vw,40px)]"
        style={{ height: `${projects.length * CARD_SCROLL_PX}px` }}
      >
        {projects.map((project, i) => (
          <StackCard
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Link to full work page */}
      <div className="mt-12 text-center">
        <a
          href="/work"
          data-magnetic
          className="inline-flex items-center gap-2 rounded-xl px-7 py-3 font-mono text-[13px] transition-all"
          style={{
            border: "1px solid rgba(99,102,241,0.3)",
            color: "#6366f1",
            background: "rgba(99,102,241,0.06)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.12)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.06)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)";
          }}
        >
          View all projects →
        </a>
      </div>
    </section>
  );
}
