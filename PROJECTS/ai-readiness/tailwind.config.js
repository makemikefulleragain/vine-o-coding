/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: {
          50: '#f0f5f1',
          100: '#d9e8dc',
          200: '#b3d1b9',
          300: '#8FB996',
          400: '#6ba374',
          500: '#4A7C59',
          600: '#3b6347',
          700: '#2c4a35',
          800: '#1e3224',
          900: '#0f1912',
        },
        warmwhite: '#FAFAF5',
        charcoal: '#2D2D2D',
        amber: {
          warm: '#D4A373',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
