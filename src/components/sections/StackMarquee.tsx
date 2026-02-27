import { techNames } from "@/lib/data";

// Double the array for seamless infinite loop
const items = [...techNames, ...techNames];

export function StackMarquee() {
  return (
    <div
      id="stack"
      className="relative z-10 overflow-hidden py-8"
      style={{
        background: "rgba(255,255,255,0.035)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Gradient fade masks — left & right edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
        style={{ background: "linear-gradient(to right, #0a0a0f, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
        style={{ background: "linear-gradient(to left, #0a0a0f, transparent)" }}
      />

      {/* ── Row 1 — scrolls left → right (normal) ── */}
      <div className="mb-4 flex w-max animate-marquee gap-14">
        {items.map((name, i) => (
          <MarqueeWord key={`a-${i}`} name={name} flipped={false} />
        ))}
      </div>

      {/* ── Row 2 — scrolls right → left (mirror) ── */}
      <div
        className="flex w-max gap-14"
        style={{ animation: "marqueeReverse 28s linear infinite" }}
      >
        {items.map((name, i) => (
          <MarqueeWord key={`b-${i}`} name={name} flipped={true} />
        ))}
      </div>

      {/* Reverse keyframe — injected as style tag */}
      <style>{`
        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function MarqueeWord({ name, flipped }: { name: string; flipped: boolean }) {
  return (
    <span
      className="group relative cursor-default select-none whitespace-nowrap font-mono font-semibold uppercase tracking-[3px] transition-all duration-300"
      style={{
        fontSize: "clamp(13px, 1.4vw, 18px)",
        color: "rgba(148,163,184,0.55)",
        display: "inline-block",
        /* Mirror the second row */
        transform: flipped ? "scaleX(-1)" : "none",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.color = "#818cf8";
        el.style.transform = flipped ? "scaleX(-1) scaleY(-1)" : "scaleY(-1)";
        el.style.filter = "drop-shadow(0 0 8px rgba(129,140,248,0.6))";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.color = "rgba(148,163,184,0.55)";
        el.style.transform = flipped ? "scaleX(-1)" : "none";
        el.style.filter = "none";
      }}
    >
      {name}
      {/* Dot separator */}
      <span
        className="ml-14 inline-block"
        style={{
          position: "absolute",
          right: "-28px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: "rgba(99,102,241,0.35)",
        }}
      />
    </span>
  );
}
