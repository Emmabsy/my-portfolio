"use client";
import { useState, useEffect, useRef } from "react";

// ── useTypewriter ────────────────────────────────────────────────────────────
export function useTypewriter(lines: string[], speed = 38) {
  const [display, setDisplay] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIdx >= lines.length) { setDone(true); return; }
    if (charIdx <= lines[lineIdx].length) {
      const t = setTimeout(() => {
        setDisplay(prev => { const n = [...prev]; n[lineIdx] = lines[lineIdx].slice(0, charIdx); return n; });
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, 400);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, done, lines, speed]);

  return { display, done, currentLine: lineIdx };
}

// ── useTilt ───────────────────────────────────────────────────────────────────
export function useTilt<T extends HTMLElement>(maxDeg = 12) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) scale3d(1.03,1.03,1.03)`;
    };
    const onLeave = () => { el.style.transform = "perspective(700px) rotateY(0) rotateX(0) scale3d(1,1,1)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [maxDeg]);
  return ref;
}

// ── useScrollY / useParallax ─────────────────────────────────────────────────
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}
export function useParallax(factor = 0.3) { return useScrollY() * factor; }
