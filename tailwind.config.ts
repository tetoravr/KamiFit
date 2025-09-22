import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C4DFF",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#00BCD4",
          foreground: "#012A2F",
        },
        dark: "#1C1C1E",
        accent: "#FFC400",
      },
      fontFamily: {
        display: ["Poppins", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        subtle: "0 10px 40px rgba(124, 77, 255, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
