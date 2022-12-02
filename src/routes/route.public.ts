import { Request, Response, Router } from "express"
import { getSettingsDatabase } from "../utils/database"
import { TEMPLATE } from "../constants"
import { Pager } from "../Pager"

export const publicRoutes = (app: Router) => {
  app.get("/login", async (req: Request, res: Response) => {
    // If the user is already logged in via cookies, redirect them to the dashboard
    if (req.user) {
      return res.redirect('/')
    }

    await Pager.render(res, req, TEMPLATE.PUBLIC, {})
  })

  app.get("/register", async (req: Request, res: Response) => {
    // If the user is already logged in via cookies, redirect them to the dashboard
    if (req.user) {
      return res.redirect('/')
    }
    
    const database = getSettingsDatabase()
    if (!database.registrationEnabled){
      req.flash('error_message', 'Registration is not enabled!')
      return res.redirect("/login")
    }
    
    await Pager.render(res, req, TEMPLATE.PUBLIC, {})
  })
}
