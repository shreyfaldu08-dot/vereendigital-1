import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        pitch: "#060606",
        coal: "#0D0D0D",
        paper: "#FFFFFF",
        /** Vereen's own green, lifted from the current site. Bright lime is
            the accent; olive is the deeper step for hovers and hairlines.
            Lime is light, so anything sitting on it is ink, never white. */
        flare: "#A8DB42",
        "flare-mid": "#89BC30",
        "flare-deep": "#6F9925",
        /** Chapter grounds. The scroll moves black → green-black → lime →
            black → bone → black → lime, so the page reads as sections rather
            than one unbroken dark field. */
        moss: "#07120B",
        bone: "#F2F1EC",
        "bone-deep": "#E6E4DB",
        /** Dark olive that stays legible as small text on bone (~6:1). */
        "olive-ink": "#3F4E13",
        ash: "#8E8E8E",
        "ash-light": "#B9B9B9",
        hair: "rgba(255,255,255,0.14)",
        "hair-strong": "rgba(255,255,255,0.28)",
      },
      fontFamily: {
        sans: ["var(--font-display)", "'Bricolage Grotesque'", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "'Bricolage Grotesque'", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        shell: "1480px",
      },
      transitionTimingFunction: {
        vereen: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        curtain: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
