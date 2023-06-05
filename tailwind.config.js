/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{tsx,mdx}', './app/**/*.{tsx,mdx}'],
  theme: {
    extend: {
      backgroundSize: {
        normal: '100%',
        zoom: '120%',
      },
    },
  },
  plugins: [],
};
