"use client";

import { useEffect, useState } from "react";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { useParallax } from "@/hooks/useParallax";
import { siteConfig, terminalLines } from "@/lib/data";

const LINE_COLORS = ["#2dd4bf", "#818cf8", "#c4b5fd", "#fbbf24"];

const ROLES = [
  "Full-Stack Developer",
  "AI Engineer",
  "Game Developer",
  "Open Source Builder",
];

const HEADLINE_ROWS = [
  { text: "Full-Stack",    style: "plain"    },
  { text: "Developer",     style: "gradient" },
  { text: "& AI Engineer", style: "dim"      },
];

function AnimatedHeadline() {
  const [show, setShow] = useState([false, false, false]);

  useEffect(() => {
    [220, 520, 820].forEach((d, i) =>
      setTimeout(() => setShow((p) => { const n = [...p]; n[i] = true; return n; }), d)
    );
  }, []);

  return (
    <div className="mb-7 text-center">
      {HEADLINE_ROWS.map((row, i) => (
        <div key={i} className="block overflow-hidden" style={{ lineHeight: 1.05 }}>
          <span
            className="inline-block font-serif tracking-tight"
            style={{
              fontWeight: row.style === "dim" ? 300 : 700,
              fontSize:
                row.style === "dim"
                  ? "clamp(22px, 3.8vw, 46px)"
                  : "clamp(52px, 9vw, 96px)",
              opacity: show[i] ? 1 : 0,
              transform: show[i] ? "none" : "translateY(60px)",
              transition: "opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)",
              ...(row.style === "gradient"
                ? {
                    background: "linear-gradient(135deg, #6366f1 0%, #2dd4bf 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : row.style === "dim"
                ? { color: "var(--text-muted)", fontStyle: "italic" }
                : { color: "var(--text-primary)" }),
            }}
          >
            {row.text}
          </span>
        </div>
      ))}

      {/* Name ribbon */}
      <div
        className="mt-5 flex items-center justify-center gap-4"
        style={{
          opacity: show[2] ? 1 : 0,
          transform: show[2] ? "none" : "translateY(10px)",
          transition: "opacity 0.5s 1.1s, transform 0.5s 1.1s",
        }}
      >
        <div className="h-px w-10" style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.5))" }} />
        <span className="font-mono text-[12px] uppercase tracking-[4px]" style={{ color: "#6366f1" }}>
          Emma Maikuri
        </span>
        <div className="h-px w-10" style={{ background: "linear-gradient(to left, transparent, rgba(99,102,241,0.5))" }} />
      </div>
    </div>
  );
}

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [curLine, setCurLine] = useState(0);
  const [curChar, setCurChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (curLine >= terminalLines.length) { setDone(true); return; }
    if (curChar <= terminalLines[curLine].length) {
      const t = setTimeout(() => {
        setLines((prev) => {
          const n = [...prev];
          n[curLine] = terminalLines[curLine].slice(0, curChar);
          return n;
        });
        setCurChar((c) => c + 1);
      }, 30);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setCurLine((l) => l + 1); setCurChar(0); }, 340);
      return () => clearTimeout(t);
    }
  }, [curLine, curChar, done]);

  return (
    <div
      className="w-full max-w-[560px] rounded-2xl border p-5 font-mono text-[13px] leading-[2]"
      style={{
        /* Always dark terminal regardless of page theme */
        background: "rgba(10,10,20,0.88)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
      }}
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px]" style={{ color: "#475569" }}>~/emma-dev</span>
        <span className="ml-1 font-mono text-[11px]" style={{ color: "#6366f1" }}>main</span>
      </div>

      {terminalLines.map((_, i) => (
        <div key={i} className="flex">
          <span className="mr-2 select-none" style={{ color: "#6366f1" }}>❯</span>
          <span style={{ color: LINE_COLORS[i] ?? "#f1f5f9" }}>
            {lines[i] ?? ""}
            {i === curLine && !done && (
              <span
                style={{
                  display: "inline-block", width: 2, height: "1em",
                  background: "#6366f1", verticalAlign: "text-bottom",
                  marginLeft: 1, animation: "blink 0.9s step-end infinite",
                }}
              />
            )}
          </span>
        </div>
      ))}
      {done && (
        <div className="flex">
          <span className="mr-2" style={{ color: "#6366f1" }}>❯</span>
          <span style={{ display: "inline-block", width: 2, height: "1em", background: "#6366f1", verticalAlign: "text-bottom", animation: "blink 0.9s step-end infinite" }} />
        </div>
      )}
    </div>
  );
}

export function HeroSection() {
  const parallaxY = useParallax(0.2);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-[clamp(20px,5vw,80px)] pb-16"
      style={{ paddingTop: "clamp(100px, 14vh, 160px)" }}
    >
      <ParticleCanvas />

      <div
        className="pointer-events-none absolute left-1/2 top-[40%] h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          transform: `translate(-50%, calc(-50% + ${parallaxY}px))`,
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[15%] right-[5%] h-[250px] w-[250px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">

        {/* Availability badge */}
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{
            border: "1px solid rgba(45,212,191,0.3)",
            background: "rgba(45,212,191,0.07)",
            animation: "fadeSlideUp 0.6s 0.1s both",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#2dd4bf", animation: "pulseGlow 2s infinite" }} />
          <span className="font-mono text-[11px] uppercase tracking-[3px]" style={{ color: "#2dd4bf" }}>
            {siteConfig.availability}
          </span>
        </div>

        <AnimatedHeadline />

        {/* Role tags */}
        <div className="mb-7 flex flex-wrap justify-center gap-2" style={{ animation: "fadeSlideUp 0.6s 1.1s both" }}>
          {ROLES.map((role) => (
            <span
              key={role}
              className="rounded-lg px-3.5 py-1 font-mono text-[11px] tracking-wide"
              style={{
                border: "1px solid rgba(99,102,241,0.2)",
                background: "rgba(99,102,241,0.07)",
                color: "#6366f1",
              }}
            >
              {role}
            </span>
          ))}
        </div>

        <p
          className="mb-10 max-w-[500px] text-[15px] leading-[1.85]"
          style={{ color: "var(--text-dim)", animation: "fadeSlideUp 0.6s 1.2s both" }}
        >
          {siteConfig.description}
        </p>

        <div className="mb-10 w-full max-w-[560px]" style={{ animation: "fadeSlideUp 0.6s 1.3s both" }}>
          <Terminal />
        </div>

        <div className="flex flex-wrap justify-center gap-4" style={{ animation: "fadeSlideUp 0.6s 1.4s both" }}>
          <a
            href="#work"
            data-magnetic
            className="rounded-xl px-8 py-3.5 text-sm font-semibold text-white transition-shadow"
            style={{ background: "#6366f1", boxShadow: "0 0 32px rgba(99,102,241,0.35)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(99,102,241,0.6)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(99,102,241,0.35)")}
          >
            View My Work →
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            data-magnetic
            className="rounded-xl px-8 py-3.5 text-sm transition-colors"
            style={{ border: "1px solid rgba(99,102,241,0.25)", color: "#6366f1", background: "rgba(99,102,241,0.06)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.12)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.06)"; }}
          >
            Get in Touch
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4" style={{ animation: "fadeSlideUp 0.6s 1.5s both" }}>
          {[
            { icon: "☁️", label: "Microsoft Azure", sub: "Cloud Certified" },
            { icon: "🤖", label: "IBM AI & ML",     sub: "Certified 2021"  },
            { icon: "⚡", label: "Tendza AI",       sub: "Currently building" },
          ].map(({ icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl px-5 py-3.5"
              style={{
                border: "1px solid rgba(99,102,241,0.15)",
                background: "rgba(99,102,241,0.05)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="text-xl">{icon}</span>
              <div className="text-left">
                <div className="font-mono text-[12px] font-semibold" style={{ color: "var(--text-primary)" }}>{label}</div>
                <div className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2" style={{ opacity: 0.3 }}>
        <span className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: "var(--text-muted)" }}>Scroll</span>
        <div className="h-8 w-px" style={{ background: `linear-gradient(to bottom, var(--text-muted), transparent)` }} />
      </div>
    </section>
  );
}
