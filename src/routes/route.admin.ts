import { Request, Response, Router } from "express"
import path from "path"
import fs from "fs-extra"
import multer from "multer"
import { authCheck, adminCheck, wrap } from "../utils/utils"
import { getSettingsDatabase } from "../utils/database"
import { TEMPLATE } from "../constants"
import { Pager } from "../Pager"
import { defaultPPStorage, imageFileFilter, logoStorage } from "../utils/uploads"

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
      const { name, siteTitle, siteDescription, loginText, appEmoji, privateModeEnabled, registrationEnabled } = req.body

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

      name ? settingsDatabase.name = name : null
      siteTitle ? settingsDatabase.siteTitle = siteTitle : null
      siteDescription ? settingsDatabase.siteDescription = siteDescription : null
      loginText ? settingsDatabase.loginText = loginText : null
      appEmoji ? settingsDatabase.appEmoji = appEmoji : null
      privateModeEnabled ? settingsDatabase.privateModeEnabled = true : settingsDatabase.privateModeEnabled = false
      registrationEnabled ? settingsDatabase.registrationEnabled = true : settingsDatabase.registrationEnabled = false

      fs.writeJsonSync(settingsDatabaseLocation, settingsDatabase, { spaces: 4 })

      req.flash('success_alert_message', 'Settings successfully saved')
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
      uploadLogo(req, res, (err) => {
        if (err) {
          console.log(err)
          req.flash('error_message', 'Logo failed to upload')
          return res.redirect('/admin')
        }
      })

      req.flash('success_alert_message', 'Logo successfully uploaded and saved')
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
      uploadDefaultPP(req, res, (err) => {
        if (err) {
          console.log(err)
          req.flash('error_message', 'Logo failed to upload')
          return res.redirect('/admin')
        }
      })
      req.flash('success_alert_message', 'Logo successfully uploaded and saved')
      return res.redirect('/admin')
    }
  )
}
