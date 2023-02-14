/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1980px",
    },
    colors: {
      brand1: "#4529E6",
    },
    fontFamily: {
      Lexend: ["Lexend"],
      Inter: ["Inter"],
    },
    fontSize: {
      "text-4.5xl": "2.75rem",
    },
  },
};
