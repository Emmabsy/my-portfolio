"use client";

import { useInView } from "react-intersection-observer";
import { experience } from "@/lib/data";
import type { Experience } from "@/types";

function NodeCard({ item, inView, delay }: { item: Experience; inView: boolean; delay: number }) {
  return (
    <div
      className="w-full rounded-2xl p-5 transition-all duration-500 sm:p-7"
      style={{
        background: inView ? "var(--card-bg)" : "var(--bg-alt)",
        border: `1px solid ${inView ? "var(--card-border)" : "var(--border-sub)"}`,
        boxShadow: inView ? "var(--card-shadow)" : "none",
        transitionDelay: `${delay + 0.08}s`,
      }}
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-lg px-3 py-1.5"
        style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-border)" }}>
        <span className="font-mono text-[11px] tracking-widest" style={{ color: "var(--brand)" }}>{item.year}</span>
        {item.current && (
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--teal)", animation: "pulseGlow 2s ease-in-out infinite" }} />
        )}
      </div>
      <h3 className="mb-1 font-serif text-[16px] font-bold leading-snug tracking-tight sm:text-[18px]" style={{ color: "var(--card-text)" }}>
        {item.role}
      </h3>
      <p className="mb-3 text-[13px] font-medium" style={{ color: "var(--teal)" }}>@ {item.company}</p>
      <p className="text-[12px] leading-[1.8] sm:text-[13px]" style={{ color: "var(--card-text-dim)" }}>{item.description}</p>
      {item.highlights && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.highlights.map(h => (
            <span key={h} className="rounded-md px-2.5 py-0.5 font-mono text-[10px]"
              style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-border)", color: "var(--card-text-muted)" }}>
              {h}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Mobile: vertical single-column timeline ── */
function MobileTimeline() {
  return (
    <div className="flex flex-col gap-6">
      {experience.map((item, i) => {
        const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
        return (
          <div key={item.id} ref={ref}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: `opacity 0.5s ${i * 0.1}s ease, transform 0.5s ${i * 0.1}s ease`,
            }}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2"
                style={{ borderColor: inView ? "var(--brand)" : "var(--border)", background: inView ? "var(--chip-bg)" : "var(--bg-alt)" }}>
                <div className="h-2 w-2 rounded-full" style={{ background: inView ? "var(--brand)" : "var(--border)" }} />
              </div>
              {i < experience.length - 1 && (
                <div className="h-px flex-1" style={{ background: "var(--border-sub)" }} />
              )}
            </div>
            <NodeCard item={item} inView={inView} delay={i * 0.1} />
          </div>
        );
      })}
    </div>
  );
}

/* ── Desktop: alternating left/right timeline ── */
function DesktopTimeline() {
  return (
    <div>
      {experience.map((item, i) => {
        const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
        const isLeft = i % 2 === 0;
        return (
          <div key={item.id} ref={ref}
            className="relative grid grid-cols-[1fr_56px_1fr] items-start"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : `translateX(${isLeft ? "-24px" : "24px"})`,
              transition: `opacity 0.55s ${i * 0.12}s ease, transform 0.55s ${i * 0.12}s ease`,
            }}>
            <div className={isLeft ? "pb-12 pr-6" : "pb-12 invisible pointer-events-none"}>
              {isLeft && <NodeCard item={item} inView={inView} delay={i * 0.12} />}
            </div>
            <div className="flex flex-col items-center">
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500"
                style={{ borderColor: inView ? "var(--brand)" : "var(--border)", background: inView ? "var(--chip-bg)" : "var(--bg-alt)", boxShadow: inView ? "0 0 0 5px var(--chip-bg), 0 0 20px rgba(99,102,241,0.3)" : "none", transitionDelay: `${i * 0.12 + 0.2}s` }}>
                <div className="h-2.5 w-2.5 rounded-full transition-all duration-500"
                  style={{ background: inView ? "var(--brand-dim)" : "var(--border)", transitionDelay: `${i * 0.12 + 0.3}s` }} />
              </div>
              {i < experience.length - 1 && (
                <div className="w-px flex-1" style={{ minHeight: 80, background: inView ? "linear-gradient(to bottom, rgba(99,102,241,0.45), rgba(99,102,241,0.04))" : "var(--border-sub)", transition: `background 0.7s ${i * 0.12 + 0.4}s` }} />
              )}
            </div>
            <div className={!isLeft ? "pb-12 pl-6" : "pb-12 invisible pointer-events-none"}>
              {!isLeft && <NodeCard item={item} inView={inView} delay={i * 0.12} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 px-[clamp(16px,5vw,80px)]" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
      <div className="mb-10 text-center sm:mb-14">
        <span className="mb-3 block font-mono text-[10px] uppercase tracking-[4px]" style={{ color: "var(--brand)" }}>
          // 03. Career
        </span>
        <h2 className="font-serif font-bold leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(24px,5vw,48px)", color: "var(--text)" }}>
          Where I&apos;ve shipped code.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed sm:text-[14px]" style={{ color: "var(--text-muted)" }}>
          From banking to AI — building things that scale.
        </p>
      </div>

      {/* Mobile: single column */}
      <div className="mx-auto max-w-lg md:hidden">
        <MobileTimeline />
      </div>

      {/* Desktop: alternating */}
      <div className="mx-auto hidden max-w-4xl md:block">
        <DesktopTimeline />
      </div>
    </section>
  );
}
