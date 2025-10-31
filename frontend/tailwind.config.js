/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryPink: "#FF85A1",
        primaryTeal: "#00BFA6",
      },
    },
  },
  plugins: [],
};
