module.exports = {
  purge: ['./src/components/**/*.tsx'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadowColor: {
        rose: '#fff',
      },
      colors: {
        amber: {
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
        },
        emerald: {
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        fuchsia: {
          400: '#e879f9',
        },
        lime: {
          100: '#ecfccb',
          300: '#bef264',
          400: '#a3e635',
        },
        rose: {
          500: '#f43f5e',
          600: '#e11d48',
        },
        sky: {
          300: '#7dd3fc',
        },
        slate: {
          700: '#334155',
        },
      },
    },
  },
  plugins: [],
  variants: {
    brightness: ['hover'],
  },
};
