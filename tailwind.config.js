/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components/**/*.{tsx,mdx}', './app/**/*.{tsx,mdx}'],
  theme: {
    extend: {
      backgroundSize: {
        normal: '100%',
        zoom: '120%',
      },
      colors: {
        raisinBlack: '#1b1725',
        englishViolet: '#534b62',
        roseQuartz: '#a499b3',
        thisle: '#d0bcd5',
        celticBlue: '#226ce0',
      },
      animation: {
        'yellow-to-white': 'yellowToWhite 2s ease-in-out infinite',
      },
      keyframes: {
        yellowToWhite: {
          '0%': { backgroundColor: '#ffeec2' },
          '50%': { backgroundColor: 'white' },
          '100%': { backgroundColor: '#ffeec2' },
        },
      },
    },
  },
  plugins: [],
};
