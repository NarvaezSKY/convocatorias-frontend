import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  darkMode: "class",
  plugins: [heroui()],
  safelist: [
    {
      pattern: /(data|group-data|aria)-\[.*\]/,
    },
    {
      pattern: /(bg|border|text)-(default|foreground|primary|secondary|danger|success|warning)/,
    },
  ],
};
