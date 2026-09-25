import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#b9ddfd",
          300: "#7cc2fb",
          400: "#36a3f7",
          500: "#0c87eb",
          600: "#0269c9",
          700: "#0354a2",
          800: "#074785",
          900: "#0c3c6f",
          950: "#082649",
        },
        gold: {
          300: "#f3d07a",
          400: "#e5b84c",
          500: "#d4af37",
          600: "#c5a059",
          700: "#9e7d32",
        },
        hillsong: {
          black: "#0b0b0e",
          dark: "#121216",
          surface: "#18181d",
          card: "#1e1e24",
          cardElevated: "#25252d",
          border: "#2b2b34",
          muted: "#8e8e99",
          gray: "#5a5a66",
          light: "#f6f6f6",
          cardLight: "#ffffff",
          borderLight: "#e5e5e5",
          gold: "#c5a059",
          goldLight: "#9e7d32",
          goldMuted: "rgba(197, 160, 89, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-subtle": "pulseSubtle 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
