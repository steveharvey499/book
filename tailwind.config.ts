import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // DNA Base Colors - The Synthesis Brand
        adenine: {
          DEFAULT: "#1A2F3D", // Deep Navy - Primary
          light: "#2D4A5C",
        },
        thymine: {
          DEFAULT: "#2A5A5B", // Sophisticated Teal - Accents
          light: "#3D7272",
        },
        guanine: {
          DEFAULT: "#4A5568", // Warm Slate - Secondary
          mid: "#6B7280",
        },
        cytosine: {
          DEFAULT: "#B8935E", // Refined Gold - Highlights
          light: "#D4AF7A",
        },
        // Text Colors
        text: {
          primary: "#1A1A1A", // Near-black
          body: "#2D3748", // Dark slate
          secondary: "#718096", // Medium gray
          tertiary: "#A0AEC0", // Light gray
        },
        // Background Colors
        bg: {
          primary: "#FFFFFF",
          secondary: "#F7FAFC",
          tertiary: "#EDF2F7",
          dark: "#1A202C",
        },
        // Legacy support (mapping to brand colors)
        navy: {
          DEFAULT: "#1A2F3D", // Adenine
          50: "#F7FAFC", // bg-secondary
          100: "#EDF2F7", // bg-tertiary
          200: "#A0AEC0", // text-tertiary
          300: "#718096", // text-secondary
          400: "#6B7280", // guanine-mid
          500: "#4A5568", // guanine
          600: "#3D7272", // thymine-light
          700: "#2A5A5B", // thymine
          800: "#2D4A5C", // adenine-light
          900: "#1A2F3D", // adenine
        },
        teal: {
          DEFAULT: "#2A5A5B", // Thymine
          50: "#F7FAFC",
          100: "#EDF2F7",
          200: "#A0AEC0",
          300: "#718096",
          400: "#6B7280",
          500: "#4A5568",
          600: "#3D7272", // thymine-light
          700: "#2A5A5B", // thymine
          800: "#2D4A5C",
          900: "#1A2F3D",
        },
      },
      fontFamily: {
        display: ["var(--font-freight-display)", "serif"], // Freight Display Pro for headings
        sans: ["var(--font-acumin)", "var(--font-inter)", "system-ui", "sans-serif"], // Acumin Pro for body
      },
      fontSize: {
        // Hero Headline (H1)
        "hero": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        // Section Headers (H2)
        "section": ["clamp(2rem, 4vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        // Subsection (H3)
        "subsection": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        // Intro/Emphasized Text
        "intro": ["clamp(1.125rem, 2vw, 1.5rem)", { lineHeight: "1.6" }],
        // Body Text
        "body": ["clamp(1rem, 1.5vw, 1.125rem)", { lineHeight: "1.6" }],
        // Small Text
        "small": ["clamp(0.875rem, 1vw, 1rem)", { lineHeight: "1.5" }],
        // Button Text
        "button": ["1rem", { lineHeight: "1.5", fontWeight: "600" }],
        // Labels/Metadata
        "label": ["0.75rem", { lineHeight: "1.5", fontWeight: "600", letterSpacing: "0.1em" }],
      },
    },
  },
  plugins: [typography],
};
export default config;
