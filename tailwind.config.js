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
          primary: '#1b253b', //bg-primary
          secondary: '#232d45', //bg-secondary
          secondaryHover: '#222f4d', //bg-secondary-hover
          tertiary: '#28334e', //bg-tertiary
          tertiaryHover: '#2d3c5d' //bg-tertiary-hover
        },
        darkthemeText: {
          primary: colors.white, //text-color-primary
          secondary: colors.slate[400], //text-color-secondary
          accentPrimary: colors.purple[400], //text-color-accent
          accentSecondary: colors.purple[800] //text-color-accentsecondary
        },
        lighttheme: {
          primary: '#2b910e', //bg-primary
          secondary: '#f1f5f9', //bg-secondary
          secondaryHover: '#294ab3', //bg-secondary-hover
          tertiary: colors.white, //bg-tertiary
          tertiaryHover: '#eef1f6' //bg-tertiary-hover
        },
        lightthemeText: {
          primary: colors.slate[800], //text-color-primary
          secondary: colors.slate[400], //text-color-secondary
          accentPrimary: colors.purple[600], //text-color-accent
          accentSecondary: colors.purple[800] //text-color-accentsecondary
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