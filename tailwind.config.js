const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./site/**/*.{ts,js,css}'],
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

/* eslint @typescript-eslint/no-var-requires:"off" */
