"use client";

import { useState, useEffect } from "react";

export function MagneticCursor() {
  const [pos,     setPos]     = useState({ x: -200, y: -200 });
  const [hover,   setHover]   = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move  = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const over  = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("[data-magnetic]")) setHover(true); };
    const out   = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest("[data-magnetic]")) setHover(false); };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — uses CSS var for color so it's visible in both modes */}
      <div
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,opacity] duration-200"
        style={{
          left: pos.x,
          top:  pos.y,
          width:  hover ? 44 : 12,
          height: hover ? 44 : 12,
          background:   hover ? "transparent" : "var(--cursor-fill)",
          border:       hover ? "1.5px solid var(--cursor-ring)" : "none",
          opacity: 0.9,
        }}
      />
      {/* Centre dot — always visible */}
      <div
        className="pointer-events-none fixed z-[9999] h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left:       pos.x,
          top:        pos.y,
          background: "var(--brand)",
          opacity: hover ? 1 : 0,
        }}
      />
    </>
  );
}
