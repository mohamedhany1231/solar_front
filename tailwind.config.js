/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-50": "#F9F7F7",
        "main-100": "#DBE2EF",
        "main-200": "#C1D8F2",
        "main-250": "#A6C6EB",
        "main-300": "#7CABE2",
        "main-350": "#3F72AF",
        "main-400": "#2665B0",
        "main-500": "#1D4D86",
        "main-600": "#173D6A",
        "main-700": "#112D4E",
        "main-800": "#0B1D32",
        // "main-850": "#081524",
        "main-900": "#081524",
        "main-950": "#050D16",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
