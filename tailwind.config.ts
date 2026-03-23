import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#26303A",
        "brand-card": "#2E3A45",
        "brand-darker": "#1C252D",
        "brand-turquoise": "#12D197",
        "brand-muted": "#A0ADB8",
      },
    },
  },
  plugins: [],
};

export default config;
