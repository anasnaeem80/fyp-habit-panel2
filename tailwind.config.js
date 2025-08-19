/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#1E293B",
          200: "#1A2438",
          300: "#162033",
          400: "#121C2E",
          500: "#0F1829",
          600: "#0B1424",
          700: "#07101F",
          800: "#030C1A",
          900: "#000815",
        },
      },
    },
  },
  plugins: [],
};
