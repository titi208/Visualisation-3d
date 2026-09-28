/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
      },
      colors: {
        'space-dark': '#020617',
        'space-blue': '#1e3a8a',
        'nebula-purple': '#8b5cf6',
        'star-yellow': '#fbbf24',
        'planet-green': '#10b981',
        'planet-blue': '#3b82f6',
        'planet-red': '#ef4444',
        'planet-orange': '#f97316',
      },
    },
  },
  plugins: [],
}
