import express from "express"
import compression from "compression" // compresses requests
import path from "path"
import passport from "passport"
import cookieSession from "cookie-session"
import flash from 'connect-flash'
import errorHandler from "errorhandler"

import { Pager } from "./Pager"
import { TEMPLATE } from "./constants"
import { authRoutes } from "./routes/route.auth"
import { publicRoutes } from "./routes/route.public"
import { userRoutes } from "./routes/route.user"
import { adminRoutes } from "./routes/route.admin"
import { PORT } from "./constants"

// Add async into express cause async is megachad
const app = express()

// Setting up express
app.set("port", PORT || 3000)
app.set("trust proxy", true)
app.set("views", path.join(__dirname, "../views"))
app.set("view engine", "ejs")
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler())

// Make express use passport and session to store the user cookie
app.use(cookieSession({
  name: 'DICK',
  keys: ['_H-A*7LKy0ivJCc3JJ!p7GriVigPN+faeXKl3QS8tx)SRoJV6l6s2biA#BAR2a9siA=xfcXW(2D-Ig9J2eP83zeBC6Fc%BSvg+DQbeWljQ$ypx!dtJ(#VTu!Cu#hXQQoilz4-Mr33xz&#(PdRwuP1T'],
  maxAge: 30 * 24 * 60 * 1000 // 30 days
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())

// Global variables
app.use((request, response, next) => {
  response.locals.success_alert_message = request.flash('success_alert_message');
  response.locals.error_message = request.flash('error_message');
  response.locals.error = request.flash('error');
  next();
})

// Make the public folder available publically, you know, so the public can view the public files that should be freely open to the genreal public
app.use(
  express.static(path.join(__dirname, "public/"), { maxAge: 31557600000 })
)

// Add the routes
authRoutes(app)
publicRoutes(app)
userRoutes(app)
adminRoutes(app)

// Catch all 404 page
app.use(async (req, res) => await Pager.render(res, req, TEMPLATE.ERRORS[404]))

// Run DICK
app.listen(app.get("port"), () => {
  console.log(
    "  Dick is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  )
  console.log("  Press CTRL-C to stop\n")
})
