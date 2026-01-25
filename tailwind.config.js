/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Big Foot Theme
        emerald: {
          950: '#022c22', // Darkest Forest Background
          900: '#064e3b', // Card/Section Background
          800: '#065f46', // Border Colors
          700: '#047857', // Muted accents
        },
        lime: {
          400: '#a3e635', // Primary "Big Foot" Glow
          300: '#bef264', // Hover states
        },
      },
      // Hype animations
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};