import { Request, Response, Router } from "express"
import path from "path"
import fs from "fs"
import { authCheck, adminCheck, wrap, getDatabase } from "../utils/utils"
import { TEMPLATE } from "../constants"
import { Pager } from "../Pager"

const databaseLocation = path.resolve(`./src/database/settings.json`)

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
      const database = getDatabase()
      const { name, logo, siteTitle, siteDescription, loginText, appEmoji, defaultProfilePicture } = req.body

      if (logo) {
       if (!/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(logo)) {
        req.flash('error_message', 'Logo URL is not a valid picture.')
        return res.redirect('/admin')
       }
       database.settings.logo = logo
      }

      if (defaultProfilePicture) {
        if (!/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(logo)) {
         req.flash('error_message', 'Default profile picture is not a valid picture.')
         return res.redirect('/admin')
        }
        database.settings.defaultProfilePicture = defaultProfilePicture
       }

      name ? database.settings.name = name : null
      siteTitle ? database.settings.siteTitle = siteTitle : null
      siteDescription ? database.settings.siteDescription = siteDescription : null
      loginText ? database.settings.loginText = loginText : null
      appEmoji ? database.settings.appEmoji = appEmoji : null

      fs.writeFileSync(databaseLocation, JSON.stringify(database), "utf-8")

      req.flash('success_alert_message', 'Settings successfully saved')
      return res.redirect('/admin')
    }
  )

}
