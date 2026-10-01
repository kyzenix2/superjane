import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070614",
        panel: "#120e1d",
        teal: {
          DEFAULT: "#3dcdc4",
          bright: "#8ff6ef",
          dim: "#0f6f6a",
        },
        sunset: "#ff6b3d",
        magenta: "#e879f9",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 10px 40px rgba(61, 205, 196, 0.35)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drift: {
          "0%, 100%": { transform: "scale(1) translate3d(0, 0, 0)" },
          "50%": { transform: "scale(1.08) translate3d(0, -2%, 0)" },
        },
        dash: {
          to: { strokeDashoffset: "-280" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        floaty: "floaty 4.8s ease-in-out infinite",
        drift: "drift 22s ease-in-out infinite",
        dash: "dash 9s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
