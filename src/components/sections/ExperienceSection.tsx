"use client";

import { useInView } from "react-intersection-observer";
import { experience } from "@/lib/data";
import type { Experience } from "@/types";

function TimelineNode({ item, index }: { item: Experience; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[1fr_56px_1fr] items-start"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateX(${isLeft ? "-24px" : "24px"})`,
        transition: `opacity 0.6s ${index * 0.14}s, transform 0.6s ${index * 0.14}s`,
      }}
    >
      {/* Left slot */}
      <div className={isLeft ? "pb-10 pr-6" : "pb-10 invisible pointer-events-none"}>
        {isLeft && <NodeCard item={item} inView={inView} delay={index * 0.14} align="right" />}
      </div>

      {/* ── Spine ── */}
      <div className="flex flex-col items-center">
        <div
          className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500"
          style={{
            borderColor: inView ? "#6366f1" : "rgba(99,102,241,0.15)",
            background:   inView ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.04)",
            boxShadow:    inView ? "0 0 0 5px rgba(99,102,241,0.08), 0 0 20px rgba(99,102,241,0.35)" : "none",
            transitionDelay: `${index * 0.14 + 0.2}s`,
          }}
        >
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{
              background: inView ? "#818cf8" : "rgba(99,102,241,0.2)",
              transition: `background 0.5s ${index * 0.14 + 0.3}s`,
            }}
          />
        </div>
        {index < experience.length - 1 && (
          <div
            className="w-px flex-1"
            style={{
              minHeight: 64,
              background: inView
                ? "linear-gradient(to bottom, rgba(99,102,241,0.4), rgba(99,102,241,0.03))"
                : "rgba(99,102,241,0.07)",
              transition: `background 0.7s ${index * 0.14 + 0.4}s`,
            }}
          />
        )}
      </div>

      {/* Right slot */}
      <div className={!isLeft ? "pb-10 pl-6" : "pb-10 invisible pointer-events-none"}>
        {!isLeft && <NodeCard item={item} inView={inView} delay={index * 0.14} align="left" />}
      </div>
    </div>
  );
}

function NodeCard({
  item,
  inView,
  delay,
  align,
}: {
  item: Experience;
  inView: boolean;
  delay: number;
  align: "left" | "right";
}) {
  return (
    <div
      className="w-full rounded-2xl p-6 transition-all duration-500"
      style={{
        maxWidth: 320,
        background: inView ? "#181826" : "#111119",
        border: `1px solid ${inView ? "rgba(99,102,241,0.22)" : "rgba(99,102,241,0.06)"}`,
        boxShadow: inView ? "0 8px 48px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset" : "none",
        marginLeft: align === "right" ? "auto" : undefined,
        transitionDelay: `${delay + 0.08}s`,
      }}
    >
      {/* Year chip */}
      <div
        className="mb-3 inline-flex items-center gap-2 rounded-lg px-3 py-1"
        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.18)" }}
      >
        <span className="font-mono text-[11px] tracking-widest" style={{ color: "#6366f1" }}>{item.year}</span>
        {item.current && (
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#2dd4bf", animation: "pulseGlow 2s ease-in-out infinite" }}
          />
        )}
      </div>

      <h3 className="mb-0.5 font-serif text-[17px] font-bold leading-snug tracking-tight" style={{ color: "#f1f5f9" }}>
        {item.role}
      </h3>

      {item.companyUrl ? (
        <a href={item.companyUrl} target="_blank" rel="noopener noreferrer"
          className="mb-3 block text-[13px] font-medium transition-opacity hover:opacity-70"
          style={{ color: "#2dd4bf" }}>
          @ {item.company}
        </a>
      ) : (
        <p className="mb-3 text-[13px] font-medium" style={{ color: "#2dd4bf" }}>@ {item.company}</p>
      )}

      <p className="text-[13px] leading-relaxed" style={{ color: "#94a3b8" }}>{item.description}</p>

      {item.highlights && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.highlights.map((h) => (
            <span
              key={h}
              className="rounded-md px-2 py-0.5 font-mono text-[10px]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#64748b" }}
            >
              {h}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative z-10 px-[clamp(20px,5vw,80px)]"
      style={{ paddingTop: "4rem", paddingBottom: "6rem" }}
    >
      {/* Centred header — SAME font size as all other sections */}
      <div className="mb-14 text-center">
        <span
          className="mb-3 block font-mono text-[10px] uppercase tracking-[4px]"
          style={{ color: "#6366f1" }}
        >
          // 03. Career
        </span>
        <h2
          className="font-serif font-bold leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(28px, 5vw, 48px)", color: "#f1f5f9" }}
        >
          Where I&apos;ve shipped code.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed" style={{ color: "#64748b" }}>
          From banking to AI — building things that scale.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        {experience.map((item, i) => (
          <TimelineNode key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
