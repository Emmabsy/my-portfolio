import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Force dark mode via a class on <html> — never follows OS preference
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg:      "#0a0a0f",
        surface: "#13131e",
        card:    "#181826",
        indigo: {
          DEFAULT: "#6366f1",
          glow:    "#818cf8",
          dim:     "rgba(99,102,241,0.12)",
        },
        teal: {
          DEFAULT: "#2dd4bf",
        },
      },
      fontFamily: {
        sans:  ["var(--font-dm-sans)",  "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Georgia",   "serif"],
        mono:  ["var(--font-mono)",     "ui-monospace", "monospace"],
      },
      animation: {
        "fade-slide-up": "fadeSlideUp 0.6s both",
        marquee:         "marquee 28s linear infinite",
        float:           "float 4s ease-in-out infinite",
        blink:           "blink 1s step-end infinite",
        "pulse-glow":    "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)"    },
        },
        marquee: {
          from: { transform: "translateX(0)"    },
          to:   { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)"  },
          "50%":       { transform: "translateY(-8px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 8px #2dd4bf"  },
          "50%":       { boxShadow: "0 0 20px #2dd4bf, 0 0 40px rgba(45,212,191,0.3)" },
        },
      },
      boxShadow: {
        glow:      "0 0 40px rgba(99,102,241,0.25)",
        "glow-lg": "0 0 60px rgba(99,102,241,0.4)",
        "glow-teal": "0 0 20px rgba(45,212,191,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;