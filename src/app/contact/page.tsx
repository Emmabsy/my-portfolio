"use client";

import { useState } from "react";
import { Navbar }   from "@/components/sections/Navbar";
import { Footer }   from "@/components/sections/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/lib/data";

type FormState = "idle" | "sending" | "sent" | "error";

const SERVICES = [
  "Web Development",
  "AI & Automation",
  "Mobile App",
  "Game Development",
  "Consulting / Code Review",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    // TODO: wire to /api/contact (Resend) — for now simulate
    await new Promise((r) => setTimeout(r, 1400));
    setState("sent");
  };

  const inputBase = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    color: "var(--text)",
    padding: "12px 16px",
    fontSize: 14,
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 grid-texture" />
      {/* Top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[50vh]"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,106,247,0.18) 0%, transparent 100%)" }} />

      <Navbar />

      <div className="px-[clamp(20px,5vw,80px)] pb-24 pt-28">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.4fr]">

          {/* Left — info */}
          <div className="pt-2">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[4px] text-indigo">
              // Contact
            </span>
            <h1 className="mb-6 font-serif font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(32px,5vw,52px)", color: "var(--text)" }}>
              Let&apos;s work
              <br />
              <span className="text-gradient">together.</span>
            </h1>
            <p className="mb-10 text-[15px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
              Have a project in mind? Fill out the form and I&apos;ll get back to you within 24 hours.
            </p>

            {/* Contact details */}
            <div className="space-y-5">
              {[
                { icon: "✉️", label: "Email",    value: siteConfig.email,    href: `mailto:${siteConfig.email}` },
                { icon: "📍", label: "Location", value: siteConfig.location, href: null },
                { icon: "🐙", label: "GitHub",   value: "github.com/emmabsy", href: siteConfig.socials.github },
                { icon: "💼", label: "LinkedIn",  value: "linkedin.com/in/emmamaikuri", href: siteConfig.socials.linkedin },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="glass flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-[16px]">
                    {icon}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[2px] text-indigo">{label}</div>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="text-[14px] transition-colors hover:text-indigo"
                        style={{ color: "var(--text-dim)" }}>
                        {value}
                      </a>
                    ) : (
                      <span className="text-[14px]" style={{ color: "var(--text-dim)" }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="mt-10 glass inline-flex items-center gap-2 rounded-full px-4 py-2">
              <span className="h-2 w-2 animate-[pulseGlow_2s_infinite] rounded-full bg-teal" />
              <span className="font-mono text-[11px] uppercase tracking-[2px] text-teal">
                {siteConfig.availability} · Remote Worldwide
              </span>
            </div>
          </div>

          {/* Right — form */}
          <GlassCard>
            {state === "sent" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 text-5xl">🎉</div>
                <h3 className="mb-2 font-serif text-2xl font-bold" style={{ color: "var(--text)" }}>Message sent!</h3>
                <p className="text-[14px]" style={{ color: "var(--text-dim)" }}>
                  Thanks for reaching out. I&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-[2px] text-indigo">Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange}
                      placeholder="Emma Maikuri" style={inputBase}
                      onFocus={e => e.target.style.borderColor = "#7c6af7"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-[2px] text-indigo">Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder="you@example.com" style={inputBase}
                      onFocus={e => e.target.style.borderColor = "#7c6af7"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  </div>
                </div>

                {/* Service */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-[2px] text-indigo">Service</label>
                  <select name="service" value={form.service} onChange={handleChange} style={inputBase}>
                    <option value="">Select a service…</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-[2px] text-indigo">Budget (optional)</label>
                  <select name="budget" value={form.budget} onChange={handleChange} style={inputBase}>
                    <option value="">Select a range…</option>
                    {["Under $500","$500–$2k","$2k–$5k","$5k–$10k","$10k+","Let&apos;s discuss"].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-[2px] text-indigo">Message *</label>
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project — what you need, timeline, and any technical details…"
                    style={{ ...inputBase, resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = "#7c6af7"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>

                <button type="submit" disabled={state === "sending"} data-magnetic
                  className="w-full rounded-xl bg-indigo py-4 font-mono text-[14px] font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:opacity-60">
                  {state === "sending" ? "Sending…" : "Send Message →"}
                </button>

                <p className="text-center font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
                  Or email directly:{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-indigo hover:underline">
                    {siteConfig.email}
                  </a>
                </p>
              </form>
            )}
          </GlassCard>
        </div>
      </div>

      <Footer />
    </main>
  );
}
