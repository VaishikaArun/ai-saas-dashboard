import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0B0D",
        panel: "#131519",
        "panel-raised": "#1B1E24",
        line: "#262A31",
        "text-primary": "#F0F1F3",
        "text-muted": "#8A8F98",
        signal: {
          DEFAULT: "#E08D3C",
          dim: "#8A5A28",
        },
        data: {
          DEFAULT: "#4FD1C5",
          dim: "#2C6E66",
        },
        alert: "#E24B4A",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        panel: "6px",
      },
      backgroundImage: {
        "grid-texture":
          "linear-gradient(to right, #1A1C21 1px, transparent 1px), linear-gradient(to bottom, #1A1C21 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "28px 28px",
      },
      keyframes: {
        trace: {
          "0%": { strokeDashoffset: "1200" },
          "100%": { strokeDashoffset: "0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.15" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "count-flicker": {
          "0%, 92%, 100%": { opacity: "1" },
          "94%": { opacity: "0.4" },
        },
      },
      animation: {
        trace: "trace 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        blink: "blink 1.8s ease-in-out infinite",
        scan: "scan 5s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "count-flicker": "count-flicker 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;