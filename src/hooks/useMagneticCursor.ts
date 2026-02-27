"use client";

import { useState, useEffect } from "react";

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isVisible: boolean;
}

export function useMagneticCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: -200,
    y: -200,
    isHovering: false,
    isVisible: false,
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursor((prev) => ({ ...prev, x: e.clientX, y: e.clientY, isVisible: true }));
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-magnetic]")) {
        setCursor((prev) => ({ ...prev, isHovering: true }));
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-magnetic]")) {
        setCursor((prev) => ({ ...prev, isHovering: false }));
      }
    };

    const onLeave = () => {
      setCursor((prev) => ({ ...prev, isVisible: false }));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return cursor;
}