/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        "blue-100": "#1fb6ff",
        "blue-200": "#2892CE",
        "blue-300": "#0B608F",
        "orange-100": "#CE7828",
        "gray-100": "#E9E9E9",
        "gray-200": "#D9D9D9"
      },
      height: {
        "1/10": "10%",
        "4/5": "80%",
        "9/10": "90%"
      }
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
  },
  plugins: [],
};
