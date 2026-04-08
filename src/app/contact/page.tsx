"use client";

import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/lib/data";

type FormState = "idle" | "sending" | "sent" | "error";

const SERVICES = ["Web Development", "AI & Automation", "n8n Workflows", "Mobile App", "Game Development", "SaaS / Boilerplate", "Consulting / Code Review", "Other"];
const BUDGETS  = ["Under $500", "$500–$2k", "$2k–$5k", "$5k–$10k", "$10k+", "Let's discuss"];

export default function ContactPage() {
  const [form, setForm]   = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    await new Promise(r => setTimeout(r, 1400));
    setState("sent");
  };

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 grid-texture" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[50vh]"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 100%)" }} />
      <Navbar />

      <div className="px-[clamp(16px,5vw,80px)] pb-16 pt-24 sm:pb-24 sm:pt-28">
        <div className="mx-auto grid max-w-5xl gap-8 sm:gap-12 lg:grid-cols-[1fr_1.4fr]">

          {/* Left: info */}
          <div className="pt-2">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[4px]" style={{ color: "var(--brand)" }}>// Contact</span>
            <h1 className="mb-6 font-serif font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(32px,5vw,52px)", color: "var(--text)" }}>
              Let&apos;s work<br /><span className="text-gradient">together.</span>
            </h1>
            <p className="mb-10 text-[14px] leading-relaxed sm:text-[15px]" style={{ color: "var(--text-dim)" }}>
              Have a project in mind? Fill out the form and I&apos;ll get back to you within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                { icon: "✉️", label: "Email",    value: siteConfig.email,    href: `mailto:${siteConfig.email}` },
                { icon: "📞", label: "Phone",    value: siteConfig.phone,    href: `tel:${siteConfig.phone}` },
                { icon: "📍", label: "Location", value: siteConfig.location, href: null },
                { icon: "🐙", label: "GitHub",   value: "github.com/emmabsy", href: siteConfig.socials.github },
                { icon: "💼", label: "LinkedIn",  value: "linkedin.com/in/emmamaikuri", href: siteConfig.socials.linkedin },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[16px]"
                    style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-border)" }}>
                    {icon}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[2px]" style={{ color: "var(--text-muted)" }}>{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="text-[14px] transition-colors hover:underline" style={{ color: "var(--text)" }}>
                        {value}
                      </a>
                    ) : (
                      <span className="text-[14px]" style={{ color: "var(--text)" }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5"
              style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-border)" }}>
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--teal)", animation: "pulseGlow 2s infinite" }} />
              <span className="font-mono text-[11px] uppercase tracking-[2px]" style={{ color: "var(--teal)" }}>
                {siteConfig.availability} · Remote Worldwide
              </span>
            </div>
          </div>

          {/* Right: form */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:p-8"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", boxShadow: "var(--card-shadow-lg)" }}>
            {state === "sent" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 text-5xl">🎉</div>
                <h3 className="mb-2 font-serif text-2xl font-bold" style={{ color: "var(--card-text)" }}>Message sent!</h3>
                <p className="text-[14px]" style={{ color: "var(--card-text-dim)" }}>Thanks for reaching out. I&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-[2px]" style={{ color: "var(--brand)" }}>Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="Emma Maikuri" className="form-input" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-[2px]" style={{ color: "var(--brand)" }}>Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="form-input" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-[2px]" style={{ color: "var(--brand)" }}>Service</label>
                  <div className="relative">
                    <select name="service" value={form.service} onChange={handleChange} className="form-input pr-10">
                      <option value="">Select a service…</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-[2px]" style={{ color: "var(--brand)" }}>Budget (optional)</label>
                  <div className="relative">
                    <select name="budget" value={form.budget} onChange={handleChange} className="form-input pr-10">
                      <option value="">Select a range…</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-[2px]" style={{ color: "var(--brand)" }}>Message *</label>
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project — what you need, timeline, and any technical details…"
                    className="form-input" style={{ resize: "vertical" }} />
                </div>
                <button type="submit" disabled={state === "sending"}
                  className="w-full rounded-xl py-4 font-mono text-[14px] font-semibold text-white transition-all disabled:opacity-60"
                  style={{ background: "var(--brand)", boxShadow: "0 0 30px rgba(99,102,241,0.3)" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(99,102,241,0.5)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(99,102,241,0.3)")}>
                  {state === "sending" ? "Sending…" : "Send Message →"}
                </button>
                <p className="text-center font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
                  Or reach me directly:{" "}
                  <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--brand)" }} className="hover:underline">{siteConfig.email}</a>
                  {" · "}
                  <a href={`tel:${siteConfig.phone}`} style={{ color: "var(--brand)" }} className="hover:underline">{siteConfig.phone}</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
