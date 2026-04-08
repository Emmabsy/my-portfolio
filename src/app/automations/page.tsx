"use client";

import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { automations } from "@/lib/data";
import type { Automation } from "@/types";

const PLATFORM_COLOR: Record<string, string> = {
  n8n: "#ff6d3b",
  Make: "#6d28d9",
  Zapier: "#ff4f00",
  Custom: "#6366f1",
};

const TAG_COLORS = [
  { bg: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.3)",  text: "#60a5fa"  },
  { bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)", text: "#a78bfa"  },
  { bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.3)",  text: "#34d399"  },
  { bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.3)",  text: "#fbbf24"  },
  { bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.3)", text: "#f472b6"  },
  { bg: "rgba(251,146,60,0.12)",  border: "rgba(251,146,60,0.3)",  text: "#fb923c"  },
];

function AutomationCard({ item }: { item: Automation }) {
  const [expanded, setExpanded] = useState(false);
  const pc = PLATFORM_COLOR[item.platform] ?? "#6366f1";

  return (
    <div
      className="relative overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: "var(--card-bg)",
        border: `1px solid ${expanded ? "rgba(99,102,241,0.35)" : "var(--card-border)"}`,
        boxShadow: expanded ? "0 8px 40px rgba(99,102,241,0.15)" : "var(--card-shadow)",
      }}
    >
      {/* Accent glow top edge */}
      <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${pc}, transparent)`, opacity: expanded ? 1 : 0, transition: "opacity 0.3s" }} />

      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
      >
        {/* Platform badge */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-[10px] font-bold"
          style={{ background: `${pc}18`, border: `1px solid ${pc}40`, color: pc }}>
          {item.platform}
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-1 flex items-center gap-2 flex-wrap">
            <h3 className="font-serif text-[16px] font-bold leading-snug sm:text-[18px]" style={{ color: "var(--card-text)" }}>
              {item.title}
            </h3>
            {item.wip && (
              <span className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[1px]"
                style={{ color: "#fbbf24", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)" }}>
                In Progress
              </span>
            )}
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: "var(--card-text-dim)" }}>
            {item.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((tag, ti) => {
              const c = TAG_COLORS[ti % TAG_COLORS.length];
              return (
                <span key={tag} className="rounded-lg px-2 py-0.5 font-mono text-[10px]"
                  style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Expand chevron */}
        <div className="shrink-0 transition-transform duration-300 mt-1" style={{ transform: expanded ? "rotate(180deg)" : "none" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-muted)" }}>
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </button>

      {/* Expanded detail */}
      <div className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: expanded ? 400 : 0, opacity: expanded ? 1 : 0 }}>
        <div className="border-t px-5 pb-5 pt-4 sm:px-6 sm:pb-6" style={{ borderColor: "var(--border)" }}>
          <p className="mb-5 text-[13px] leading-[1.8]" style={{ color: "var(--text-dim)" }}>
            {item.longDescription}
          </p>

          {/* Node flow diagram — decorative */}
          <div className="mb-5 flex items-center gap-2 overflow-x-auto py-1">
            {item.tags.map((tag, ti) => {
              const c = TAG_COLORS[ti % TAG_COLORS.length];
              return (
                <div key={tag} className="flex items-center gap-2 shrink-0">
                  <div className="rounded-lg px-3 py-2 font-mono text-[11px] font-medium"
                    style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                    {tag}
                  </div>
                  {ti < item.tags.length - 1 && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-muted)", flexShrink: 0 }}>
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            {item.liveUrl ? (
              <a href={item.liveUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[12px] font-semibold text-white transition-shadow"
                style={{ background: pc, boxShadow: `0 4px 20px ${pc}40` }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = `0 4px 32px ${pc}70`)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${pc}40`)}>
                Get this workflow
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[12px]"
                style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-border)", color: "var(--text-muted)" }}>
                Contact me for access
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const ALL_PLATFORMS = ["All", ...Array.from(new Set(automations.map(a => a.platform)))];
const ALL_FILTER_TAGS = ["All", ...Array.from(new Set(automations.flatMap(a => a.tags))).slice(0, 8)];

export default function AutomationsPage() {
  const [platformFilter, setPlatformFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");

  const filtered = automations.filter(a =>
    (platformFilter === "All" || a.platform === platformFilter) &&
    (tagFilter === "All" || a.tags.includes(tagFilter))
  );

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 grid-texture" />
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ paddingTop: "clamp(110px,16vh,160px)", paddingBottom: 60 }}>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-serif font-bold leading-none select-none"
          style={{ fontSize: "clamp(60px,15vw,200px)", color: "var(--border-sub)", letterSpacing: -6 }}>
          AUTO
        </div>

        <div className="relative px-[clamp(20px,5vw,80px)] text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-center gap-3">
              <a href="/" className="flex items-center gap-1.5 font-mono text-[11px] transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--brand)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Home
              </a>
              <span style={{ color: "var(--border)" }}>/</span>
              <span className="font-mono text-[11px]" style={{ color: "var(--brand)" }}>Automations</span>
            </div>

            <h1 className="font-serif font-bold leading-[0.96] tracking-tight"
              style={{ fontSize: "clamp(38px,7vw,72px)", color: "var(--text)" }}>
              Automation<br />
              <span className="text-gradient">workflows.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
              Production-ready n8n workflows — AI agents, content pipelines, lead generation, and business automation. Click any card to see how it works.
            </p>

            {/* Stats */}
            <div className="mt-8 flex justify-center gap-10">
              {[
                { value: String(automations.length), label: "Workflows" },
                { value: String(automations.filter(a => a.liveUrl).length), label: "Available" },
                { value: "n8n", label: "Platform" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-serif text-[26px] font-bold leading-none" style={{ color: "var(--brand)" }}>{value}</div>
                  <div className="mt-0.5 font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-[clamp(20px,5vw,80px)] pb-8">
        <div className="mx-auto max-w-4xl space-y-3">
          <div className="flex flex-wrap justify-center gap-2">
            {ALL_PLATFORMS.map(p => (
              <button key={p} onClick={() => setPlatformFilter(p)}
                className="rounded-xl px-4 py-2 font-mono text-[12px] transition-all duration-150"
                style={{ background: platformFilter === p ? PLATFORM_COLOR[p] ?? "var(--brand)" : "var(--chip-bg)", border: `1px solid ${platformFilter === p ? PLATFORM_COLOR[p] ?? "var(--brand)" : "var(--chip-border)"}`, color: platformFilter === p ? "#fff" : "var(--chip-text)" }}>
                {p}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {ALL_FILTER_TAGS.map(t => (
              <button key={t} onClick={() => setTagFilter(t)}
                className="rounded-xl px-3.5 py-1.5 font-mono text-[11px] transition-all duration-150"
                style={{ background: tagFilter === t ? "var(--brand)" : "var(--chip-bg)", border: `1px solid ${tagFilter === t ? "var(--brand)" : "var(--chip-border)"}`, color: tagFilter === t ? "#fff" : "var(--chip-text)" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="px-[clamp(20px,5vw,80px)] pb-20">
        <div className="mx-auto max-w-4xl space-y-4">
          {filtered.length === 0 ? (
            <p className="py-16 text-center font-mono text-[14px]" style={{ color: "var(--text-muted)" }}>No automations match this filter.</p>
          ) : (
            filtered.map(item => <AutomationCard key={item.id} item={item} />)
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-[clamp(20px,5vw,80px)] py-16" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-elevated)" }}>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="font-serif text-[20px] font-bold" style={{ color: "var(--text)" }}>Need a custom automation?</h3>
            <p className="mt-1 text-[14px]" style={{ color: "var(--text-muted)" }}>I build bespoke n8n workflows for businesses of any size.</p>
          </div>
          <a href="/contact"
            className="shrink-0 rounded-xl px-7 py-3.5 font-mono text-[13px] font-semibold text-white transition-shadow"
            style={{ background: "#ff6d3b", boxShadow: "0 4px 20px rgba(255,109,59,0.3)", whiteSpace: "nowrap" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 36px rgba(255,109,59,0.55)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(255,109,59,0.3)")}>
            Get a custom workflow →
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
