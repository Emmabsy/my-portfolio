import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/lib/data";

export function HomeCTA() {
  return (
    <section className="relative z-10 px-[clamp(20px,5vw,80px)] py-24">
      <GlassCard className="relative px-10 py-16 text-center">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,106,247,0.13), transparent 70%)" }} />

        <span className="relative font-mono text-[10px] uppercase tracking-[4px] text-indigo">
          // {siteConfig.availability}
        </span>

        <h2 className="relative my-5 font-serif font-bold leading-tight tracking-tight"
          style={{ fontSize: "clamp(26px,5vw,46px)", color: "var(--text)" }}>
          Let&apos;s build something
          <br />
          <span className="text-gradient">exceptional together.</span>
        </h2>

        <p className="relative mx-auto mb-9 max-w-md text-[15px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
          I&apos;m open to freelance contracts, full-time roles, and collaborations. Based in Nairobi — available worldwide.
        </p>

        <div className="relative flex flex-wrap justify-center gap-3">
          <Link href="/contact" data-magnetic
            className="rounded-xl bg-indigo px-10 py-4 text-[15px] font-semibold text-white shadow-glow transition-shadow hover:shadow-glow-lg">
            Start a conversation →
          </Link>
          <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" data-magnetic
            className="rounded-xl border px-10 py-4 text-[15px] transition-colors hover:text-slate-100"
            style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}>
            GitHub
          </a>
        </div>
      </GlassCard>
    </section>
  );
}
