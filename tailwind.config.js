/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EA',
        warmWhite: '#FCFAF5',
        forestDeep: '#182019',
        forest: '#2C3A2D',
        sage: '#8B9B88',
        olive: '#7B8266',
        mutedText: '#4A544C',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}