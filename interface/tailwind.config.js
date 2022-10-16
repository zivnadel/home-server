/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1F2937",
        light: "#F9FAFB",
        primary: "#3B82F6",
        secondary: "#6B7280",
      },
    },
    plugins: [],
  },
}
