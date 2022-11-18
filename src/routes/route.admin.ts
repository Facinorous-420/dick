import { Request, Response, Router } from "express"
import path from "path"
import fs from "fs"
import multer from "multer"
import { authCheck, adminCheck, wrap, getSettingsDatabase } from "../utils/utils"
import { TEMPLATE } from "../constants"
import { Pager } from "../Pager"

const uploadImage = multer({ dest: './' })

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
    "/admin",
    authCheck,
    adminCheck,
    (req: Request, res: Response) => {
      const settingsDatabase = getSettingsDatabase()
      const { name, siteTitle, siteDescription, loginText, appEmoji, privateMode, registrationEnabled } = req.body

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
      privateMode ? settingsDatabase.privateModeEnabled = privateMode : null
      registrationEnabled ? settingsDatabase.registrationEnabled = registrationEnabled : null

      fs.writeFileSync(settingsDatabaseLocation, JSON.stringify(settingsDatabase), "utf-8")

      req.flash('success_alert_message', 'Settings successfully saved')
      return res.redirect('/admin')
    }
  )

}
