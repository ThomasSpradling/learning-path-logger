/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{tsx,mdx}', './app/**/*.{tsx,mdx}'],
  theme: {
    extend: {
      backgroundSize: {
        normal: '100%',
        zoom: '120%',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        raisinBlack: '#1b1725',
        englishViolet: '#534b62',
        roseQuartz: '#a499b3',
        thisle: '#d0bcd5',
        celticBlue: '#226ce0',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
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
