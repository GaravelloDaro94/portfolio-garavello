import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Colores personalizados para el portfolio
        "light-text": "#1F2937",
        "blue-pastel": "#A7C7E7",
        mint: "#B8E0D2",
        pink: "#F7C8E0",
        yellow: "#FFF5B7",
        "light-border": "#E5E7EB",
        "dark-charcoal": "#1C1C1C",
        "dark-medium": "#2E2E2E",
        "dark-smoke": "#E0E0E0",
        "dark-blue-gray": "#3A4A58",
        "dark-blue-pastel": "#7FA6C9",
      },
      keyframes: {
        "bounce-horizontal": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
        },
      },
      animation: {
        "bounce-horizontal": "bounce-horizontal 1s ease-in-out infinite",
      },
    },
  },
  plugins: [heroui()],
};

export default config;
