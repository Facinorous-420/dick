import { Request, Response, NextFunction, Router } from "express"
import { authCheck, checkCaptcha } from "../utils/middleware"
import { checkIfUserExistInASS, checkIfUserExistInDICK, createUserInASS, createUserInDICK } from "../utils/database"

const { passport } = require("../utils/passport")

export const authRoutes = (app: Router) => {
  // If user is already logged in, send the profile response,
  // Otherwise, send a 401 response that the user is not authenticated
  // AuthCheck before navigating to home page
  app.get("/auth/check", authCheck, (req: Request, res: Response) => {
    res.status(200).json({
      authenticated: true,
      message: "user successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    })
  })

  // When login is successful, retrieve user info
  app.get("/auth/login/success", (req: Request, res: Response) => {
    if (req.user) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
        cookies: req.cookies,
      })
    }
  })

  // When login failed, send failed msg
  app.get("/auth/login/failed", (req: Request, res: Response) => {
    res.status(401).json({
      success: false,
      message: "Username or password is incorrect.",
    })
  })

  app.get("/auth/logout", (req: Request, res: Response) => {
    req.logout({ keepSessionInfo: false }, null)
    req.flash('success_alert_message', 'You have been succesfully logged out')
    return res.redirect("/login")
  })

  // Auth with local passport, send them to ricky boy to prevent brute forcing 'cause Im too lazy to add proper captcha rn
  app.post(
    "/auth/login",
    checkCaptcha,
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      failureFlash: true
    }),
    (next: NextFunction) => {
      next()
    }
  )

  // Redirect to home page after successfully login
  app.get(
    "/auth/callback",
    passport.authenticate("local"),
    (req: Request, res: Response) => {
      if (req.user) {
        return res.redirect("/")
      }
      return res.redirect("/login")
    }
  )

  // Register page post request on button submit
  app.post('/auth/register', async (req, res) => {
    // Check if the form is filled our properly
    if (!req.body.username) {
      req.flash('error_message', 'You did not include a username!')
      return res.redirect("/register")
    }
    if (!req.body.password) {
      req.flash('error_message', 'You did not include a password!')
      return res.redirect("/register")
    }
    if (req.body.username > 20) {
      req.flash('error_messge', 'Username can not be more than 20 characters!')
      return res.redirect("/register")
    }
    if (req.body.password < 5) {
      req.flash('error_messge', 'Secret key can not be less than 5 characters!')
      return res.redirect("/register")
    }

    // Check if user exists in ass or dick, if it does then we throw error
    if (await checkIfUserExistInASS(req.body.username, req.body.password) || await checkIfUserExistInDICK(req.body.username)) {
      req.flash('error_message', 'User already exists!')
      return res.redirect("/register")
    }

    // Create the user
    await createUserInASS(req.body.username, req.body.password)
    await createUserInDICK(req.body.username)

    // Redirect them to the login screen
    req.flash('success_alert_message', `You have sucesfully created a user with the name ${req.body.username}. You can now log in.`)
    return res.redirect("/login")
  })

}
