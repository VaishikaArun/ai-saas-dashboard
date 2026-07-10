import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0F",
        panel: "#14141C",
        "panel-raised": "#1B1B26",
        line: "#2A2A38",
        "text-primary": "#F4F4F8",
        "text-muted": "#86869A",
        signal: {
          DEFAULT: "#FF2D6C",
          dim: "#7A1738",
        },
        data: {
          DEFAULT: "#2F7FFF",
          dim: "#173B7A",
        },
        alert: "#FF4D4D",
      },
      fontFamily: {
        display: ["var(--font-display)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        panel: "4px",
      },
    },
  },
  plugins: [],
};
export default config;