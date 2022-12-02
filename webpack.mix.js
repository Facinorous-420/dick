const mix = require('laravel-mix')

mix.disableNotifications()

// I'm using laravel-mix to copy all the images, and js to the public folder then transpile the EJSmodules in src/public/modules/app.js
mix.setPublicPath('dist/public')
   .copyDirectory("src/public/js", "dist/public/js")
   .copyDirectory("src/public/images", "dist/public/images")
   .js('src/public/modules/app.js', 'dist/public/js')