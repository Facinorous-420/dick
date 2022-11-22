import { Request, Response, Router } from "express"
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

    await Pager.render(res, req, TEMPLATE.PUBLIC, {})
  })
}
