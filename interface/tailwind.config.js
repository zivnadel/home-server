/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  jit: true,
  theme: {
    extend: {
      colors: {
        dark: "#1F2937",
        light: "#F9FAFB",
        primary: "#2192FF",
        secondary: "#38E54D",
      },
      animation: {
        "slide-from-right": "slide-from-right 0.1s ease-out",
      },
      keyframes: {
        "slide-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        }
      }
    },
    plugins: [],
  },
}
