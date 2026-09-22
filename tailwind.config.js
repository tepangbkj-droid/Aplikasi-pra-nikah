/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF7F2",
        ink: "#2A2321",
        wine: {
          DEFAULT: "#7C2D3B",
          light: "#9A4152",
          dark: "#5E212C",
        },
        gold: {
          DEFAULT: "#B08D57",
          light: "#D4B888",
          dark: "#8A6B3E",
        },
        sage: "#6B7B5E",
        blush: "#F4E9D8",
        rose: "#EFE1DD",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(42, 35, 33, 0.08)",
        card: "0 2px 12px -2px rgba(124, 45, 59, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
