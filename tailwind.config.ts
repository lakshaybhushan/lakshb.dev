import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-satoshi)"],
        voyage: ["var(--font-voyage)"],
      },
      colors: {
        primary: "#FA5A38",
        background: "#F3EEE2",
        dark: "#111111",
        cardBg: "#FFEADA",
        cardBorder: "#DDD8CD",
      },
      fontSize: {
        title: "4rem",
      },
    },
  },
  plugins: [],
};
export default config;
