/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C2A28',    // Coffee Black
        secondary: '#F5F5F5',  // Cream White
        accent: '#C7A17A',     // Mocha Beige
        text: '#333333',       // Deep Charcoal
        button: '#8B6D5C',     // Latte Brown
        buttonHover: '#A68A75', // Light Mocha
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
} 