import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { projects } from "@/lib/data";
import { formatCount } from "@/lib/utils";
import type { Project } from "@/types";

const TAG_STYLE: Record<string, { text: string; bg: string; border: string }> = {
  ML:       { text: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.28)" },
  Frontend: { text: "#2dd4bf", bg: "rgba(45,212,191,0.12)",  border: "rgba(45,212,191,0.28)"  },
  Systems:  { text: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.28)"  },
  DevOps:   { text: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.28)"  },
  Mobile:   { text: "#f472b6", bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.28)" },
  OSS:      { text: "#818cf8", bg: "rgba(129,140,248,0.12)", border: "rgba(129,140,248,0.28)" },
};

const LANG_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#d4a017",
  Python:     "#3572a5",
  Rust:       "#e05d44",
  Go:         "#00add8",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tag = TAG_STYLE[project.tag] ?? TAG_STYLE["OSS"];

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: "linear-gradient(150deg, #1c1b30 0%, #13121f 60%, #0f0e1c 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
        animationDelay: `${index * 0.07}s`,
        animation: "fadeSlideUp 0.5s both",
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.2)")}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 30px rgba(0,0,0,0.3)")}
    >
      {/* Coloured top strip */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${tag.text}70, transparent)` }} />

      <div className="flex flex-1 flex-col p-6">
        {/* Tag + live */}
        <div className="mb-4 flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[1.5px]"
            style={{ color: tag.text, background: tag.bg, border: `1px solid ${tag.border}` }}
          >
            {project.tag}
          </span>
          {project.hasLiveDemo && (
            <span className="flex items-center gap-1 font-mono text-[10px]" style={{ color: "#2dd4bf" }}>
              <span className="h-1 w-1 rounded-full" style={{ background: "#2dd4bf" }} />
              Live
            </span>
          )}
        </div>

        <h3
          className="mb-2 font-serif font-bold leading-snug tracking-tight"
          style={{ fontSize: "clamp(20px,2.5vw,26px)", color: "#f1f5f9" }}
        >
          {project.title}
        </h3>

        <p className="mb-5 flex-1 text-[13px] leading-[1.75]" style={{ color: "#94a3b8" }}>
          {project.description}
        </p>

        {/* Tech stack */}
        {project.techStack && (
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="rounded-md px-2.5 py-0.5 font-mono text-[10px]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#64748b",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          className="flex items-center justify-between gap-3 border-t pt-4"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3 font-mono text-[11px]" style={{ color: "#475569" }}>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: LANG_COLOR[project.language] ?? "#888" }} />
              {project.language}
            </span>
            {project.stars > 0 && <span>⭐ {formatCount(project.stars)}</span>}
            {project.forks  > 0 && <span>⑂ {project.forks}</span>}
          </div>
          <div className="flex gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-1.5 font-mono text-[11px] transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}
            >
              GitHub
            </a>
            {project.hasLiveDemo && project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-3 py-1.5 font-mono text-[11px] text-white"
                style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
              >
                Live →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  return (
    <main>
      <Navbar />

      <section
        className="min-h-screen px-[clamp(20px,5vw,80px)]"
        style={{ paddingTop: "clamp(100px,14vh,160px)", paddingBottom: "6rem" }}
      >
        {/* ── Centred header ── */}
        <div className="mb-16 text-center">
          <a
            href="/"
            className="mb-6 inline-flex items-center gap-2 font-mono text-[12px] transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#6366f1")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            ← Back home
          </a>

          <span
            className="mb-3 block font-mono text-[10px] uppercase tracking-[4px]"
            style={{ color: "#6366f1" }}
          >
            // All Projects
          </span>

          <h1
            className="font-serif font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(36px, 6vw, 64px)", color: "var(--text-primary)" }}
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
          </h1>

          <p
            className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed"
            style={{ color: "var(--text-dim)" }}
          >
            A collection of projects across web, AI, systems, and more.
          </p>
        </div>

        {/* ── Projects grid ── */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
