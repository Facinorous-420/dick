import { Request, Response, Router } from "express"
import path from "path"
import fs from "fs-extra"
import multer from "multer"
import { authCheck, adminCheck, wrap } from "../utils/middleware"
import { checkIfUserExistInASS, checkIfUserExistInDICK, createUserInASS, createUserInDICK, getSettingsDatabase } from "../utils/database"
import { TEMPLATE } from "../constants"
import { Pager } from "../Pager"
import { defaultPPStorage, defaultPPStorageDist, imageFileFilter, logoStorage, logoStorageDist } from "../utils/uploads"

const settingsDatabaseLocation = path.resolve(`./src/database/settings.json`)

export const adminRoutes = (app: Router) => {
  app.get(
    "/admin",
    authCheck,
    adminCheck,
    wrap,
    async (req: Request, res: Response) => {
      return Pager.render(res, req, TEMPLATE.USER, {})
    }
  )

  // Save button on app settings page
  app.post(
    "/admin/save/settings",
    authCheck,
    adminCheck,
    (req: Request, res: Response) => {
      const settingsDatabase = getSettingsDatabase()
      const { name, appEmoji, siteTitle, siteDescription, loginText, captchaCheckbox, captchaSiteID, captchaSecretKey, privateModeEnabled, registrationEnabled } = req.body

      /* 
      *  This code is for if I ever decide to add changing the location of the image urls (such as calling an external URL from local files) 
      \
      if (logo) {
       if (!/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(logo)) {
        req.flash('error_message', 'Logo URL is not a valid picture.')
        return res.redirect('/admin')
       }
       settingsDatabase.logo = logo
      }

      if (defaultProfilePicture) {
        if (!/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(logo)) {
         req.flash('error_message', 'Default profile picture is not a valid picture.')
         return res.redirect('/admin')
        }
        settingsDatabase.defaultProfilePicture = defaultProfilePicture
       }
       */

      if (captchaCheckbox) {
        // If they do not have a capatcha site id set, they can not enable and save capatcha preventing it not working.
        if (!settingsDatabase.captchaSiteID) {
          if (!captchaSiteID) {
            req.flash('error_message', 'You must include a captcha site ID to enable captcha.')
            return res.redirect('/admin')
          }
        }

        if (!settingsDatabase.captchaSecretKey) {
          if (!captchaSecretKey) {
            req.flash('error_message', 'You must include a captcha secret key to enable captcha.')
            return res.redirect('/admin')
          }
        }
        settingsDatabase.captchaEnabled = true
      } else {
        settingsDatabase.captchaEnabled = false
      }

      name ? settingsDatabase.name = name : null
      appEmoji ? settingsDatabase.appEmoji = appEmoji : null
      siteTitle ? settingsDatabase.siteTitle = siteTitle : null
      siteDescription ? settingsDatabase.siteDescription = siteDescription : null
      loginText ? settingsDatabase.loginText = loginText : null
      captchaSiteID ? settingsDatabase.captchaSiteID = captchaSiteID : null
      captchaSecretKey ? settingsDatabase.captchaSecretKey = captchaSecretKey : null
      privateModeEnabled ? settingsDatabase.privateModeEnabled = true : settingsDatabase.privateModeEnabled = false
      registrationEnabled ? settingsDatabase.registrationEnabled = true : settingsDatabase.registrationEnabled = false

      fs.writeJsonSync(settingsDatabaseLocation, settingsDatabase, { spaces: 4 })

      req.flash('success_alert_message', 'Settings successfully saved!')
      return res.redirect('/admin')
    }
  )

  // App logo upload on app settings page
  app.post(
    "/admin/upload/logo",
    authCheck,
    adminCheck,
    (req: Request, res: Response) => {
      const uploadLogo = multer({ storage: logoStorage, fileFilter: imageFileFilter }).fields([{ name: 'app-logo', maxCount: 1 }])
      const uploadLogoDist = multer({ storage: logoStorageDist, fileFilter: imageFileFilter }).fields([{ name: 'app-logo', maxCount: 1 }])
      uploadLogo(req, res, (err) => {
        if (err) {
          console.log(err)
          req.flash('error_message', 'Logo failed to upload!')
          return res.redirect('/admin')
        }
      })
      uploadLogoDist(req, res, (err) => {
        if (err) {
          console.log(err)
          req.flash('error_message', 'Logo failed to upload!')
          return res.redirect('/admin')
        }
      })

      req.flash('success_alert_message', 'Logo has been uploaded!')
      return res.redirect('/admin')
    }
  )

  // Default profile picture upload on app settings page
  app.post(
    "/admin/upload/default-pp",
    authCheck,
    adminCheck,
    (req: Request, res: Response) => {
      const uploadDefaultPP = multer({ storage: defaultPPStorage, fileFilter: imageFileFilter }).fields([{ name: 'default-pp', maxCount: 1 }])
      const uploadDefaultPPDist = multer({ storage: defaultPPStorageDist, fileFilter: imageFileFilter }).fields([{ name: 'default-pp', maxCount: 1 }])
      uploadDefaultPP(req, res, (err) => {
        if (err) {
          console.log(err)
          req.flash('error_message', 'Profile picture failed to upload!')
          return res.redirect('/admin')
        }
      })
      uploadDefaultPPDist(req, res, (err) => {
        if (err) {
          console.log(err)
          req.flash('error_message', 'Logo failed to upload!')
          return res.redirect('/admin')
        }
      })

      req.flash('success_alert_message', 'Logo has been uploaded!')
      return res.redirect('/admin')
    }
  )

    // Add new user via add user modal
    app.post('/admin/add/user', async (req, res) => {
      // Check if the form is filled our properly
      if (!req.body.username) {
        req.flash('error_message', 'You did not include a username!')
        return res.redirect("/admin")
      }
      if (!req.body.password) {
        req.flash('error_message', 'You did not include a password!')
        return res.redirect("/admin")
      }
      if (req.body.username > 20) {
        req.flash('error_messge', 'Username can not be more than 20 characters!')
        return res.redirect("/admin")
      }
      if (req.body.password < 5) {
        req.flash('error_messge', 'Password can not be less than 5 characters!')
        return res.redirect("/admin")
      }
  
      // Check if user exists in ass or dick, if it does then we throw error
      if (await checkIfUserExistInASS(req.body.username, req.body.password) || await checkIfUserExistInDICK(req.body.username)) {
        req.flash('error_message', 'User already exists!')
        return res.redirect("/admin")
      }
  
      // Create the user
      await createUserInASS(req.body.username, req.body.password)
      await createUserInDICK(req.body.username)

      // Redirect them to the login screen
      req.flash('success_alert_message', `You have sucesfully created a user with the name ${req.body.username}. They can now log in with the token you provided.`)
      return res.redirect("/admin")
    })
}
