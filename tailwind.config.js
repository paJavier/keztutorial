/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kez: {
          blue: "#1E40AF",
          yellow: "#FACC15",
          light: "#EFF6FF",
          dark: "#0F172A",
        },
      },
    },
  },
  plugins: [],
};
