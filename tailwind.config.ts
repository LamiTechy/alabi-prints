import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0F",
          950: "#0B0B0F",
          900: "#121218",
          800: "#1A1A22",
          700: "#26262F",
          600: "#3A3A46",
        },
        brand: {
          DEFAULT: "#E11D2E",
          red: "#E11D2E",
          dark: "#B7131F",
          light: "#FF4655",
        },
        cyan: { DEFAULT: "#00AEEF", 600: "#0086BA", 700: "#006B95" },
        magenta: { DEFAULT: "#EC008C", 600: "#BC0070", 700: "#96005A" },
        yellow: { DEFAULT: "#FFD500", 600: "#B08800", 700: "#8A6B00" },
        paper: "#F5F6F8",
      },
      fontFamily: {
        display: ["var(--font-display)", "Poppins", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "Caveat", "cursive"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,11,15,0.06), 0 8px 24px -12px rgba(11,11,15,0.18)",
        "card-hover": "0 2px 4px rgba(11,11,15,0.06), 0 24px 48px -20px rgba(11,11,15,0.32)",
        cmyk: "0 12px 40px -20px rgba(225,29,46,0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        wiggle: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee-x 26s linear infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        wiggle: "wiggle 2.4s ease-in-out infinite",
      },
      maxWidth: {
        shell: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;
