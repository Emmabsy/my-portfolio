"use client";

import { useEffect, useState } from "react";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { useParallax } from "@/hooks/useParallax";
import { siteConfig, terminalLines } from "@/lib/data";

const LINE_COLORS = ["#2dd4bf", "#818cf8", "#c4b5fd", "#fbbf24"];

const HEADLINE_ROWS = [
  { text: "Full-Stack",    style: "plain"    },
  { text: "Developer",     style: "gradient" },
  { text: "& AI Engineer", style: "dim"      },
];

function AnimatedHeadline() {
  const [show, setShow] = useState([false, false, false]);

  useEffect(() => {
    [220, 520, 820].forEach((d, i) =>
      setTimeout(() => setShow(p => { const n = [...p]; n[i] = true; return n; }), d)
    );
  }, []);

  return (
    <div className="mb-6 text-center">
      {HEADLINE_ROWS.map((row, i) => (
        <div key={i} className="block overflow-hidden" style={{ lineHeight: 1.05 }}>
          <span
            className="inline-block font-serif tracking-tight"
            style={{
              fontWeight: row.style === "dim" ? 300 : 700,
              fontSize:
                row.style === "dim"
                  ? "clamp(16px, 3.5vw, 46px)"
                  : "clamp(42px, 9vw, 96px)",
              opacity: show[i] ? 1 : 0,
              transform: show[i] ? "none" : "translateY(60px)",
              transition: "opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)",
              ...(row.style === "gradient"
                ? { background: "linear-gradient(135deg, #6366f1 0%, #2dd4bf 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
                : row.style === "dim"
                ? { color: "var(--text-muted)", fontStyle: "italic" }
                : { color: "var(--text-primary)" }),
            }}
          >
            {row.text}
          </span>
        </div>
      ))}

      <div
        className="mt-4 flex items-center justify-center gap-4"
        style={{
          opacity: show[2] ? 1 : 0,
          transform: show[2] ? "none" : "translateY(10px)",
          transition: "opacity 0.5s 1.1s, transform 0.5s 1.1s",
        }}
      >
        <div className="h-px w-8 sm:w-10" style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.5))" }} />
        <span className="font-mono text-[11px] uppercase tracking-[4px]" style={{ color: "#6366f1" }}>
          Emma Maikuri
        </span>
        <div className="h-px w-8 sm:w-10" style={{ background: "linear-gradient(to left, transparent, rgba(99,102,241,0.5))" }} />
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
        setLines(prev => { const n = [...prev]; n[curLine] = terminalLines[curLine].slice(0, curChar); return n; });
        setCurChar(c => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setCurLine(l => l + 1); setCurChar(0); }, 320);
      return () => clearTimeout(t);
    }
  }, [curLine, curChar, done]);

  return (
    <div
      className="w-full overflow-x-auto rounded-2xl border p-4 font-mono text-[11px] leading-[2] sm:p-5 sm:text-[13px]"
      style={{
        background: "rgba(10,10,20,0.88)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
      }}
    >
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px]" style={{ color: "#475569" }}>~/emma-dev</span>
        <span className="ml-1 font-mono text-[11px]" style={{ color: "#6366f1" }}>main</span>
      </div>
      {terminalLines.map((_, i) => (
        <div key={i} className="flex min-w-0">
          <span className="mr-2 shrink-0 select-none" style={{ color: "#6366f1" }}>❯</span>
          <span className="break-all" style={{ color: LINE_COLORS[i] ?? "#f1f5f9" }}>
            {lines[i] ?? ""}
            {i === curLine && !done && (
              <span style={{ display: "inline-block", width: 2, height: "1em", background: "#6366f1", verticalAlign: "text-bottom", marginLeft: 1, animation: "blink 0.9s step-end infinite" }} />
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-[clamp(16px,5vw,80px)] pb-12"
      style={{ paddingTop: "clamp(88px, 14vh, 160px)" }}
    >
      <ParticleCanvas />

      <div className="pointer-events-none absolute left-1/2 top-[40%] h-[400px] w-[400px] rounded-full sm:h-[600px] sm:w-[600px]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", transform: `translate(-50%, calc(-50% + ${parallaxY}px))` }} />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">

        {/* Availability badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{ border: "1px solid rgba(45,212,191,0.3)", background: "rgba(45,212,191,0.07)", animation: "fadeSlideUp 0.6s 0.1s both" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#2dd4bf", animation: "pulseGlow 2s infinite" }} />
          <span className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: "#2dd4bf" }}>
            {siteConfig.availability}
          </span>
        </div>

        <AnimatedHeadline />

        {/* Role tags */}
        <div className="mb-6 flex flex-wrap justify-center gap-2" style={{ animation: "fadeSlideUp 0.6s 1.1s both" }}>
          {["Full-Stack Dev", "AI Engineer", "Game Dev", "Open Source"].map(role => (
            <span key={role} className="rounded-lg px-3 py-1 font-mono text-[10px] tracking-wide sm:text-[11px]"
              style={{ border: "1px solid rgba(99,102,241,0.2)", background: "rgba(99,102,241,0.07)", color: "#6366f1" }}>
              {role}
            </span>
          ))}
        </div>

        <p
          className="mb-8 max-w-[480px] text-[14px] leading-[1.85] sm:text-[15px]"
          style={{ color: "var(--text-dim)", animation: "fadeSlideUp 0.6s 1.2s both" }}
        >
          {siteConfig.description}
        </p>

        <div className="mb-8 w-full max-w-[560px]" style={{ animation: "fadeSlideUp 0.6s 1.3s both" }}>
          <Terminal />
        </div>

        {/* CTA buttons */}
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4" style={{ animation: "fadeSlideUp 0.6s 1.4s both" }}>
          <a
            href="#work"
            className="w-full rounded-xl px-8 py-3.5 text-center text-sm font-semibold text-white transition-shadow sm:w-auto"
            style={{ background: "#6366f1", boxShadow: "0 0 32px rgba(99,102,241,0.35)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(99,102,241,0.6)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(99,102,241,0.35)")}
          >
            View My Work →
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="w-full rounded-xl px-8 py-3.5 text-center text-sm transition-colors sm:w-auto"
            style={{ border: "1px solid rgba(99,102,241,0.25)", color: "#6366f1", background: "rgba(99,102,241,0.06)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.12)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.06)"; }}
          >
            Get in Touch
          </a>
        </div>

        {/* Cert / status badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-3" style={{ animation: "fadeSlideUp 0.6s 1.5s both" }}>
          {[
            { icon: "☁️", label: "Microsoft Azure", sub: "Cloud Certified" },
            { icon: "🤖", label: "IBM AI & ML",     sub: "Certified 2021"  },
            { icon: "⚡", label: "Tendza AI",       sub: "Live now"        },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl px-4 py-3 sm:px-5"
              style={{ border: "1px solid rgba(99,102,241,0.15)", background: "rgba(99,102,241,0.05)", backdropFilter: "blur(12px)" }}>
              <span className="text-lg sm:text-xl">{icon}</span>
              <div className="text-left">
                <div className="font-mono text-[11px] font-semibold sm:text-[12px]" style={{ color: "var(--text-primary)" }}>{label}</div>
                <div className="font-mono text-[9px] sm:text-[10px]" style={{ color: "var(--text-muted)" }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2" style={{ opacity: 0.3 }}>
        <span className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: "var(--text-muted)" }}>Scroll</span>
        <div className="h-8 w-px" style={{ background: "linear-gradient(to bottom, var(--text-muted), transparent)" }} />
      </div>
    </section>
  );
}
