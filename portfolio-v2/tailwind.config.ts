import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0e14",
        "ink-soft": "#12161f",
        paper: "#e7e5e0",
        "paper-dim": "#8b8f99",
        signal: "#5eead4",
        warn: "#f5a623",
        line: "#1f2430",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  safelist: [
    "bg-signal",
    "text-ink",
    "text-paper",
    "text-paper-dim",
    "text-signal",
    "bg-ink",
    "bg-ink-soft",
    "border-line",
    "border-signal",
  ],
  plugins: [],
} satisfies Config & { safelist: string[] };
