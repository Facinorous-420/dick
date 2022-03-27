import { Request, Response, NextFunction, Router } from "express"
import { authCheck } from "../utils/utils"

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

  // When logout, redirect to client
  app.get("/auth/logout", (req: Request, res: Response) => {
    const user = req.user
    req.logout()
    req.flash('success_alert_message', 'You have been succesfully logged out')
    return res.redirect("/login")
  })

  // Auth with local passport, send them to ricky boy to prevent brute forcing 'cause Im too lazy to add proper captcha rn
  app.post(
    "/auth/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      failureFlash: true
    }),
    (req: Request, res: Response, next: NextFunction) => {
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
      console.log('we hit here')
      return res.redirect("/login")
    }
  )
}
