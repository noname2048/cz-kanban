/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0D1117",
        column: "#161C22",
        primary: "#0D1117",
        secondary: "#161C22",
      },
    },
  },
  plugins: [],
};
