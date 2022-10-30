import { Request, Response, Router } from "express"
import { getDatabase } from "../utils/utils"
import { TEMPLATE } from "../constants"
import { Pager } from "../Pager"

export const publicRoutes = (app: Router) => {
  app.get("/login", async (req: Request, res: Response) => {
    // If the user is already logged in via cookies, redirect them to the dashboard
    if (req.user) {
      return res.redirect('/')
    }
    const database = getDatabase()
    await Pager.render(res, req, TEMPLATE.PUBLIC, {params: {database}})
  })
}
