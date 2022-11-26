import { Response, NextFunction } from "express"
import { Log } from "@callmekory/logger"

import { IExtendedRequest } from "../typings/express-ext"
import { checkIfUserExistInDICK, createUserInDICK, getSettingsDatabase, getUserDatabaseObj } from "./database"
/**
 * Wraps the express route in a function that passes the
 * `next` method from the route to the promise's catch
 * statement which allows the middleware to catch the
 * exception.
 */
export const wrap = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    // If the user does not exist in DICKs database yet, we add them
    if (await checkIfUserExistInDICK(req.user.username) == false) {
      createUserInDICK(req.user.username)
    }
    // Log the page the user navigated to
    Log.info(`${req.user.username} navigated to page ${req.path}`)
  }

  return next()
}

//Express middleware to check captcha token
export const checkCaptcha = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
  const database = getSettingsDatabase()

  // If captcha is enabled, we verify the captcha
  if (database.captchaEnabled) {

    console.log('body:', req.body['h-captcha-response'])

    // If there is no response for some reason
    if(!req.body['h-captcha-response']){
      Log.info(`A user submitted a form on the endpoint ${req.path} and failed captcha due to not being able to reach hCaptcha, redirecting back to login page`)
      req.flash('error_message', `You failed the captcha due to not being able to reach hCaptcha. Please reach an admin.`)
      return res.redirect("/login")
    }

    // Build payload with secret key and captcha response token from form data with key 'h-captcha-response'
    const params = new URLSearchParams()
    params.append('secret', database.captchaSecretKey)
    params.append('response', req.body['h-captcha-response'])

    // Make POST request with data payload to hCaptcha API endpoint
    const response = await fetch("https://hcaptcha.com/siteverify", { method: 'POST', body: params })
    const data = await response.json()

    // Parse JSON from response. Check for success or error codes.
    // If not correct, send back to login screen with error
    // A missing-input-response means its not getting info from hcaptcha
    console.log(data.success)
    if (data.success == false){
      Log.info(`A user submitted a form on the endpoint ${req.path} and failed captcha due to: ${data['error-codes']}, redirecting back to login page`)
      req.flash('error_message', `You failed the captcha due to ${data['error-codes']}. Please try again.`)
      return res.redirect("/login")
    }

    // Else continue as they are verified as human
    next()
  } else next()
}


// Express middleware to check if username/password match one of the users
// in auth.json
export const authCheck = (req: IExtendedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    Log.info(`A user navigated to page ${req.path} and is not logged in, redirecting to login page`)
    req.flash('error_message', 'Please log in to access the requested page')
    res.redirect('/login')
  } else next()
}

// Express middleware to check if username trying to access the page matches the users
// in CONSTANTS
export const adminCheck = (req: IExtendedRequest, res: Response, next: NextFunction) => {
  const user = getUserDatabaseObj(req.user.username)
  if (!user) {
    Log.info(`A user navigated to page ${req.path} and is not logged in, redirecting to login page`)
    req.flash('error_message', 'Please log in to access the requested page')
    res.redirect('/login')
  }
  if (user.role !== 'admin') {
    Log.info(`${req.user.username} navigated to page ${req.path} and is not an admin, redirecting to users dashboard`)
    res.redirect('/')
  } else next()
}

