"use client";

import { useState, useEffect } from "react";

export function useTypewriter(lines: string[], speed = 38) {
  const [display, setDisplay] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIdx >= lines.length) {
      setDone(true);
      return;
    }

    if (charIdx <= lines[lineIdx].length) {
      const t = setTimeout(() => {
        setDisplay((prev) => {
          const next = [...prev];
          next[lineIdx] = lines[lineIdx].slice(0, charIdx);
          return next;
        });
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, done, lines, speed]);

  return { display, done, currentLine: lineIdx };
}