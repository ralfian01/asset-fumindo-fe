/** @type {import('tailwindcss').Config} */
export default {
  // PENTING: Baris ini memberi tahu Tailwind file mana yang harus discan
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D62828',
          light: '#E45757',
        },
        secondary: '#003049',
        accent: '#F77F00',
        'light-bg': '#F8F9FA',
        'light-border': '#E9ECEF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
};