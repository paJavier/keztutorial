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
          dark: "#0B1220",      // softer dark
          cardDark: "#111827",  // slate-like
        },
      },
    },
  },
  plugins: [],
};
