const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
  './**/*.ejs',
  './src/public/**/*.js'
],
  theme: {
    extend: {
      colors: {
        darktheme: {
          primary: '#1b253b',
          secondary: '#232d45',
          secondaryHover: '#222f4d',
          tertiary: '#28334e',
          tertiaryHover: '#2d3c5d'
        },
        darkthemeText: {
          primary: colors.white,
          secondary: colors.slate[400],
          accentPrimary: colors.purple[400],
          accentSecondary: colors.purple[800]
        },
        lighttheme: {
          primary: '#2b910e',
          secondary: '#f1f5f9',
          secondaryHover: '#294ab3',
          tertiary: colors.white,
          tertiaryHover: '#eef1f6'
        },
        lightthemeText: {
          primary: colors.slate[800],
          secondary: colors.slate[400],
          accentPrimary: colors.purple[600],
          accentSecondary: colors.purple[800]
        }
      },
      maxHeight: {
        '0': '0',
        xl: '36rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        'full': '2.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}