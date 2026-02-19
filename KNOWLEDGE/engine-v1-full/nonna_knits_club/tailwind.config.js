/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        rose: {
          warm: '#D4A0A0',
          deep: '#B07070',
        },
        sage: {
          light: '#C5D5C5',
          DEFAULT: '#8BA88B',
          deep: '#6B8E6B',
        },
        amber: {
          warm: '#E8C07A',
          deep: '#C9A055',
        },
        earth: {
          light: '#D4C4B0',
          DEFAULT: '#A08060',
        },
      },
      fontFamily: {
        heading: ['"Georgia"', 'serif'],
        body: ['"Segoe UI"', '"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
