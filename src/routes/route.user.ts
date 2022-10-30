import { Request, Response, Router } from "express"
import { adminCheck, authCheck, getDatabase, wrap } from "../utils/utils"
import { TEMPLATE } from "../constants"
import { Pager } from "../Pager"
import { parseAuthFile } from "../utils/assJSONStructure"

export const userRoutes = (app: Router) => {
  // User Profile
  app.get(
    "/",
    authCheck,
    wrap,
    async (req: Request, res: Response) => {
      const database = getDatabase()
      await Pager.render(res, req, TEMPLATE.USER, {params: {database}})
    }
  )

  // External Viewing Of Other User Profiles (Admin Only)
  /* Currently fucks up the admin route :)
  app.get(
    "/:userID",
    authCheck,
    adminCheck,
    wrap,
    async (req: Request, res: Response) => {
    const allUsers = parseAuthFile()
    const User = allUsers.find((user) => user.username === req.params.userID)
    if (!User) {
      // TODO ADD USER NOT FOUND PAGE FOR THIS ERROR INSTEAD OF SENDING A 404
      return Pager.render(res, req, TEMPLATE.ERRORS[404])
    }
      return Pager.render(res, req, TEMPLATE.USER, {
        params: req.params,
      })
    }
  )
  */
}
