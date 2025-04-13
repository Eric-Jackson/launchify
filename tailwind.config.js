module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        lobster: ['"Lobster"', "cursive"],
      },
    },
  },
  plugins: [],
};

