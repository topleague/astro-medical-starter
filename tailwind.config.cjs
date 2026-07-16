/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#8b7cf6',
        'accent-light': '#c4b5fd',
      },
      borderRadius: {
        card: '1.25rem',
      },
    },
  },
  plugins: [],
};
