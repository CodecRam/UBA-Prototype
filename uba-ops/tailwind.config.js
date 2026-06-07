/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          uba: {
          50:  '#f0f7fb',
          100: '#e6f2f8',
          200: '#cfeaf5',
          300: '#9fd8ee',
          400: '#6fc6e6',
          500: '#3fb3dd',
          600: '#2b96c2',
          700: '#1f7aa0',
          800: '#185e7f',
          900: '#11455f',
          950: '#092a3a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
