import { Log } from "@callmekory/logger"
import { Response, NextFunction } from "express"
import { join, normalize } from "path"

import { IExtendedRequest } from "../typings/express-ext"
import { STAFF_IDS } from "../constants"
import { checkIfUserExistInDICK, createUserInDICK } from "./database"

// Express middleware to check if username/password match one of the users
// in auth.json
export const authCheck = (req: IExtendedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    Log.info(`A user navigated to page ${req.path} and is not logged in, redirecting to login page`)
    req.flash('error_message', 'Please log in to access the requested page')
    res.redirect('/login')
  } else next()
}

// Express middleware to check if username trying to access the page matches the users
// in CONSTANTS
export const adminCheck = (req: IExtendedRequest, res: Response, next: NextFunction) => {
  if ((STAFF_IDS.indexOf(req.user.username) > -1) == false) {
    Log.info(`${req.user.username} navigated to page ${req.path} and is not an admin, redirecting to users dashboard`)
    res.redirect('/')
  } else next()
}

/**
 * Generate the appropriate pathing for the a template to be rendered
 */
export const templatePathBuilder = (templatePath: string) => {
  const templateDir = normalize(join(__dirname, "..", "..", "views"))

  return normalize(join(templateDir, "templates", templatePath))
}

/**
 * Wraps the express route in a function that passes the
 * `next` method from the route to the promise's catch
 * statement which allows the middleware to catch the
 * exception.
 */
export const wrap = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    // If the user does not exist in DICKs database yet, we add them
    if (await checkIfUserExistInDICK(req.user.username) == false) {
      createUserInDICK(req.user.username)
    }
    // Log the page the user navigated to
    Log.info(`${req.user.username} navigated to page ${req.path}`)
  }

  return next()
}

/**
 *
 * @param obj Object to be checked if empty
 */
export const isObjectEmpty = (obj: object) => {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

/**
 *
 * @param kb Number value of the size to be formatted
 * @param decimals The amount of decimals you wish to add to the converted value
 */
export const formatSize = (kb: number, decimals = 2) => {
  if (kb === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(kb) / Math.log(k))
  return parseFloat((kb / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 *
 * @param unixTimestamp Unix timestamp you wish to convert to a Date object
 */
export const convertTimestamp = (unixTimestamp: number) => {
  return new Date(unixTimestamp)
}

/**
 *
 * @param data Original array of many objects
 * @param itemsPerPage The amount of objects you wish you wish to have in each array in the new array
 */
export const convertToPaginatedArray = (data: Array<any>, itemsPerPage: number) => {
  let paginatedArray: Array<any> = []
  for (let i = 0; i < data.length; i += itemsPerPage) {
    paginatedArray.push(data.slice(i, i + itemsPerPage))
  }
  return paginatedArray
}


