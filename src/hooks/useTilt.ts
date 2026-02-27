"use client";

import { useRef, useEffect } from "react";

export function useTilt<T extends HTMLElement>(maxDeg = 14) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(700px) rotateY(${x * maxDeg}deg) rotateX(${
        -y * maxDeg
      }deg) scale3d(1.03,1.03,1.03)`;
    };

    const onLeave = () => {
      el.style.transform =
        "perspective(700px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxDeg]);

  return ref;
}