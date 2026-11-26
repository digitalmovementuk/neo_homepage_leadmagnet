/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light surface — clean white. `-1` is pure white, `-2` a faint
        // off-white grey for alternating bands. Light theme uses only
        // white tones, no warmer sand variants.
        surface: {
          1: "#ffffff",
          2: "#f5f5f7",
        },
        // Dark surface — NEO ink graphite, used as the dark canvas for
        // alternating sections (Nav drawer, mobile case stories).
        plum: {
          DEFAULT: "#1A0E2E",
          1: "#1A0E2E",
          2: "#120A20",
        },
        ink: {
          DEFAULT: "#231F20",
          soft: "#4A4D59",
          muted: "#66636D",
          faint: "#8A8791",
        },
        dm: {
          pink: "#F05F22",
          magenta: "#F05F22",
          "hot-magenta": "#EC178D",
          violet: "#F05F22",
          "violet-deep": "#9A2FC6",
          orange: "#FFB23D",
          "orange-deep": "#F05F22",
          gold: "#FFB23D",
          whatsapp: "#25D366",
        },
        // NEO brand kit v1.1 (19.11.2026): gradient N, night, ink.
        brand: {
          night: "#1A0E2E",
          "night-2": "#120A20",
          ink: "#231F20",
          amber: "#FFB23D",
          orange: "#F05F22",
          pink: "#EC178D",
          violet: "#D332FF",
          "violet-deep": "#9A2FC6",
        },
      },
      fontFamily: {
        sans: [
          "Geist",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      // Type scale tuned for editorial / display-heavy sections.
      fontSize: {
        // Display tier — large fluid headings using clamp.
        "display-1": ["clamp(56px, 8vw, 128px)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(40px, 5.6vw, 88px)", { lineHeight: "1.0", letterSpacing: "-0.018em" }],
        "display-3": ["clamp(32px, 3.6vw, 56px)", { lineHeight: "1.05", letterSpacing: "-0.014em" }],
      },
      borderRadius: {
        card: "20px",
        "card-lg": "28px",
        pill: "999px",
        xl2: "20px",
      },
      boxShadow: {
        soft: "0 26px 60px -28px rgba(26, 14, 46, 0.22)",
        card: "0 14px 40px -22px rgba(26, 14, 46, 0.18)",
        pop: "0 22px 50px -16px rgba(241, 60, 100, 0.32)",
        ring: "0 0 0 1px rgba(26, 14, 46, 0.08)",
      },
      backgroundImage: {
        "dm-cta": "linear-gradient(55deg, #D9127F 0%, #C0198A 50%, #9A2FC6 100%)",
        "brand-button": "linear-gradient(55deg, #D9127F 0%, #C0198A 50%, #9A2FC6 100%)",
        "brand-gradient":
          "linear-gradient(135deg, #FFB23D 14%, #F05F22 33%, #EC178D 59%, #D332FF 78%, #9A2FC6 100%)",
        "brand-gradient-dark":
          "linear-gradient(135deg, #FFB23D 0%, #FC9C48 25%, #F56465 50%, #EC178D 75%, #D332FF 100%)",
        "dm-brand":
          "linear-gradient(135deg, #FFB23D 14%, #F05F22 33%, #EC178D 59%, #D332FF 78%, #9A2FC6 100%)",
      },
      keyframes: {
        // Inner CTA pulse — small ring expanding from the button edge.
        // NEO orange (#F05F22) tints the halo around the brand CTA pill.
        "pulse-plum": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(240, 95, 34, 0.55)" },
          "50%": { boxShadow: "0 0 0 14px rgba(240, 95, 34, 0)" },
        },
        // Outer bar pulse — same beat, larger ring + ink drop shadow.
        "pulse-bar": {
          "0%, 100%": {
            boxShadow:
              "0 28px 60px -20px rgba(26,27,34,0.40), 0 2px 8px -2px rgba(26,27,34,0.14), 0 0 0 0 rgba(240, 95, 34, 0.50)",
          },
          "50%": {
            boxShadow:
              "0 28px 60px -20px rgba(26,27,34,0.40), 0 2px 8px -2px rgba(26,27,34,0.14), 0 0 0 22px rgba(240, 95, 34, 0)",
          },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        // Both share 2.4s ease-in-out infinite so they pulse in lockstep.
        "pulse-plum": "pulse-plum 2.4s ease-in-out infinite",
        "pulse-bar": "pulse-bar 2.4s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
