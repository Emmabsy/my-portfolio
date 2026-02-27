"use client";

import { useTilt } from "@/hooks";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatCount } from "@/lib/utils";
import type { Project } from "@/types";

const TAG_COLORS: Record<string, string> = {
  AI:      "#7c6af7",
  Web:     "#2dd4bf",
  Game:    "#f5a623",
  Mobile:  "#c084fc",
  Systems: "#60a5fa",
  OSS:     "#34d399",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useTilt<HTMLDivElement>(11);

  return (
    <div
      ref={ref}
      data-magnetic
      className="cursor-none h-full"
      style={{
        animation: "fadeUp 0.6s both",
        animationDelay: `${index * 0.08}s`,
        transition: "transform 0.12s ease",
      }}
    >
      <GlassCard className="h-full flex flex-col">
        {/* Glow orb */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full"
          style={{ background: `radial-gradient(circle, ${TAG_COLORS[project.tag] ?? "#7c6af7"}22, transparent 70%)` }} />

        <div className="mb-3 flex items-start justify-between">
          <span className="rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-[2px]"
            style={{
              color: TAG_COLORS[project.tag] ?? "#7c6af7",
              background: `${TAG_COLORS[project.tag] ?? "#7c6af7"}18`,
            }}>
            {project.tag}
          </span>
          {project.hasLiveDemo && (
            <span className="flex items-center gap-1.5 text-[11px] text-teal">
              <span className="h-1.5 w-1.5 animate-[pulseGlow_2s_infinite] rounded-full bg-teal" />
              Live
            </span>
          )}
        </div>

        <h3 className="mb-2 font-serif text-[19px] font-bold tracking-tight" style={{ color: "var(--text)" }}>
          {project.title}
        </h3>
        <p className="mb-5 flex-1 text-[13px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
          {project.description}
        </p>

        {/* Tech pills */}
        {project.techStack && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((t) => (
              <span key={t} className="rounded border px-2 py-0.5 font-mono text-[10px]"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-[12px]" style={{ color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: project.languageColor }} />
              {project.language}
            </span>
          </div>
          <div className="flex gap-2">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="rounded-md border px-3 py-1 font-mono text-[11px] transition-colors hover:text-slate-100"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
              GitHub
            </a>
            {project.hasLiveDemo && project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="rounded-md bg-indigo px-3 py-1 font-mono text-[11px] text-white">
                Demo →
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
