const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      emerald: colors.emerald,
      sky: colors.sky,
      teal: colors.teal,
      rose: colors.rose,
    },
  },
  plugins: [],
}
