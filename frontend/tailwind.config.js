/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#080E2E",
        secondary: "#0E1438",
        highlight: "#161F40",
        button: "#3686FF",
        card_purple: "#6A60FF",
        card_blue: "#5183FF",
        card_pink: "#FF898B",
      },
    },
  },
  plugins: [],
};
