import { techNames } from "@/lib/data";

const EXTRA = ["AI Automations", "Web Development", "Game Dev", "Mobile Apps", "Full-Stack", "Nairobi 🇰🇪"];
const ROW1 = [...techNames.slice(0, 12), ...EXTRA.slice(0, 3)];
const ROW2 = [...EXTRA, ...techNames.slice(12)];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div
        className={`flex w-max gap-8 ${reverse ? "animate-[marqueeRev_32s_linear_infinite]" : "animate-marquee"}`}
        style={{ animationDuration: "34s" }}
      >
        {doubled.map((name, i) => (
          <span key={i} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[3px] whitespace-nowrap"
            style={{ color: "var(--text-muted)" }}>
            <span className="h-1 w-1 rounded-full bg-indigo opacity-60" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DiagonalBand() {
  return (
    <div
      id="stack"
      className="relative z-10 w-full py-6 overflow-hidden"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      {/* The diagonal wrapper — rotates the whole band slightly */}
      <div
        style={{
          transform: "rotate(-2.5deg)",
          transformOrigin: "center",
          margin: "0 -4%",
          width: "108%",
        }}
      >
        <div
          style={{
            background: "rgba(124,106,247,0.06)",
            border: "1px solid rgba(124,106,247,0.15)",
            padding: "12px 0",
            borderRadius: 2,
          }}
        >
          <Row items={ROW1} />
          <Row items={ROW2} reverse />
        </div>
      </div>
    </div>
  );
}
