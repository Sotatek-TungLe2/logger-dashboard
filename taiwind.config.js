/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 Tailwind sẽ scan các file này
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
