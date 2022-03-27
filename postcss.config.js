module.exports = {
    plugins: [
      require('tailwindcss'),
      require("postcss-advanced-variables"),
      require("tailwindcss/nesting"),
      require('autoprefixer'),
      require('cssnano')({
        preset: 'default',
      }),
    ],
  }