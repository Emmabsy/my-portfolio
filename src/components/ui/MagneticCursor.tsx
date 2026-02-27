"use client";

import { useState, useEffect } from "react";

export function MagneticCursor() {
  const [pos, setPos]         = useState({ x: -200, y: -200 });
  const [hover, setHover]     = useState(false);
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
      <div
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen transition-[width,height,background,border] duration-200"
        style={{
          left: pos.x, top: pos.y,
          width:  hover ? 44 : 12,
          height: hover ? 44 : 12,
          background: hover ? "transparent" : "#7c6af7",
          border: hover ? "1.5px solid #a78bfa" : "none",
        }}
      />
      <div
        className="pointer-events-none fixed z-[9999] h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ left: pos.x, top: pos.y }}
      />
    </>
  );
}
