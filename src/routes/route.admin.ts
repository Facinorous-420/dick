import { Request, Response, Router } from "express"
import { authCheck, adminCheck, wrap } from "../utils/utils"
import { TEMPLATE } from "../CONSTANTS"
import { Pager } from "../Pager"

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
}
