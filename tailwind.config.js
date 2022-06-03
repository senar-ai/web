const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      sky: colors.sky,
      teal: colors.teal,
      rose: colors.rose,
    },
  },
  plugins: [],
}
