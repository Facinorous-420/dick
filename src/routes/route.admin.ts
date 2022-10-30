import { Request, Response, Router } from "express"
import { authCheck, adminCheck, wrap, getDatabase } from "../utils/utils"
import { TEMPLATE } from "../constants"
import { Pager } from "../Pager"

export const adminRoutes = (app: Router) => {
    app.get(
        "/admin",
        authCheck,
        adminCheck,
        wrap,
        async (req: Request, res: Response) => {
          const database = getDatabase()
          return Pager.render(res, req, TEMPLATE.USER, {params: {database}})
        }
      )
}
