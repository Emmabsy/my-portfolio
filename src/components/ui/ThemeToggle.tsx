"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      data-magnetic
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200"
      style={{
        background: "var(--chip-bg)",
        border: "1px solid var(--chip-border)",
        color: "var(--chip-text)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = "var(--brand)";
        (e.currentTarget as HTMLElement).style.color = "#fff";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--brand)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "var(--chip-bg)";
        (e.currentTarget as HTMLElement).style.color = "var(--chip-text)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--chip-border)";
      }}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
