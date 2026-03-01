import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/lib/data";

export function HomeCTA() {
  return (
    <section className="relative z-10 px-[clamp(16px,5vw,80px)] py-16 sm:py-24">
      <GlassCard className="relative px-6 py-12 text-center sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,106,247,0.13), transparent 70%)" }} />
        <span className="relative font-mono text-[10px] uppercase tracking-[4px] text-indigo">
          // {siteConfig.availability}
        </span>
        <h2 className="relative my-4 font-serif font-bold leading-tight tracking-tight sm:my-5"
          style={{ fontSize: "clamp(22px,5vw,46px)", color: "var(--text)" }}>
          Let&apos;s build something
          <br />
          <span className="text-gradient">exceptional together.</span>
        </h2>
        <p className="relative mx-auto mb-7 max-w-md text-[14px] leading-relaxed sm:mb-9 sm:text-[15px]" style={{ color: "var(--text-dim)" }}>
          I&apos;m open to freelance contracts, full-time roles, and collaborations. Based in Nairobi — available worldwide.
        </p>
        <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center sm:gap-3">
          <Link href="/contact"
            className="w-full rounded-xl bg-indigo px-8 py-4 text-[14px] font-semibold text-white shadow-glow transition-shadow hover:shadow-glow-lg sm:w-auto sm:text-[15px]">
            Start a conversation →
          </Link>
          <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer"
            className="w-full rounded-xl border px-8 py-4 text-[14px] transition-colors hover:text-slate-100 sm:w-auto sm:text-[15px]"
            style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}>
            GitHub
          </a>
        </div>
      </GlassCard>
    </section>
  );
}
