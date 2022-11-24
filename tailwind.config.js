const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

// If you are adding a colour scheme to the themes below, be sure to add the combo to ./src/public/css/tailwind.css as a css element
// EG:
/*
*  .bg-primary {
*    @apply bg-lighttheme-primary dark:bg-darktheme-primary;
*  }
*/

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
          primary: '#1B253B', //bg-primary 
          secondary: '#232D45', //bg-secondary
          secondaryHover: '#222F4D', //bg-secondary-hover
          tertiary: '#28334E', //bg-tertiary
          accent: colors.purple[400], //bg-accent
          accentSecondary: colors.purple[700], //bg-accentsecondary
          tertiaryHover: '#2D3C5D', //bg-tertiary-hover
          tooltip: '#354567' //bg-toolip
        },
        darkthemeBorder: {
          tooltip: '#354567', // border-tooltip
          accent: colors.purple[400], //border-accent
          accentSecondary: colors.purple[700], //border-accentsecondary
          form: colors.gray[600], //border-form
          table: '#232D45' //border-table
        },
        darkthemeForm: {
          input: colors.gray[700] //bg-forminput
        },
        darkthemeText: {
          primary: colors.white, //text-color-primary
          secondary: colors.slate[400], //text-color-secondary
          tertiary: colors.gray[500], //text-color-tertiary
          accentPrimary: colors.purple[400], //text-color-accent
          accentSecondary: colors.purple[800], //text-color-accentsecondary
        },
        lighttheme: {
          primary: '#2596BE', //bg-primary
          secondary: '#F1F5F9', //bg-secondary
          secondaryHover: '#3FB0D9', //bg-secondary-hover
          tertiary: colors.white, //bg-tertiary
          accent: colors.purple[200], //bg-accent
          accentSecondary: colors.purple[400], //bg-accentsecondary
          tertiaryHover: '#EEF1F6', //bg-tertiary-hover
          tooltip: '#7393B3' //bg-tooltip
        },
        lightthemeBorder: {
          tooltip: '#7393B3', //border-tooltip
          accent: colors.purple[400], //border-accent
          accentSecondary: colors.purple[700], //border-accentsecondary
          form: colors.gray[600], //border-form
          table: '#C4CAD7' //border-table
        },
        lightthemeForm: {
          input: colors.white //bg-forminput
        },
        lightthemeText: {
          primary: colors.slate[800], //text-color-primary
          secondary: colors.slate[600], //text-color-secondary
          tertiary: colors.gray[700], //text-color-tertiary
          light: colors.gray[300], //text-color-light
          accentPrimary: colors.purple[600], //text-color-accent
          accentSecondary: colors.purple[800], //text-color-accentsecondary
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