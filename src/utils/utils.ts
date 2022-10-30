import { Log } from "@callmekory/logger"
import fs from "fs"
import { Response, NextFunction } from "express"
import path, { join, normalize } from "path"

import { IExtendedRequest } from "../typings/express-ext"
import { STAFF_IDS } from "../constants"
import { IDatabase, IUserSettings } from "typings/database"

const databaseLocation = path.resolve(`./src/database.json`)

// Get database, creating a default one if it doesnt exist
export const getDatabase = (): IDatabase => {
  try {
    const databaseFile = fs.readFileSync(databaseLocation).toString()
    const database: IDatabase = JSON.parse(databaseFile)
    return database
  } catch (error) {
    const defaultDatabase: IDatabase = {
        settings: {
        name: "dick",
        siteTitle: "DICK (Directly Integrated Client for Keisters)",
        siteDescription: "The frontend for your backend",
        loginText: "Sign in to easily manage your nudes.",
        logo: "./images/dick-logo.png",
        appEmoji: "🍆", 
        defaultProfilePicture: "./images/profile.png",
        registrationEnabled: false,
        adminUsers: []
      },
      users: []
    }
    fs.writeFileSync('./src/database.json', JSON.stringify(defaultDatabase), "utf-8")
    return defaultDatabase
  }
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
export const wrap = (req: IExtendedRequest, res: Response, next: NextFunction) => {

  checkIfUserExist(req.user.username)

  if (req.user) {
    Log.info(`${req.user.username} navigated to page ${req.path}`)
  }

  return next()
}

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

/**
 * Checks if the user is in our local JSON database, if they arent we add them
 * @param username Username we are checking exists
 */
export const checkIfUserExist = async (username: string) => {
  const database = getDatabase()

  // If user does not exist in our database, we create it
  if (!database.users.find((e: IUserSettings) => e.username === username)) {
    const newUser: IUserSettings = {
      username: username,
      profilePicture: null,
      config: null
    }
    database.users.push(newUser)
    fs.writeFileSync(databaseLocation, JSON.stringify(database), "utf-8")
  }

  // If there are no admin users in the database, we will make this user the admin (first user to login will always be admin)
  if (database.settings.adminUsers.length == 0) {
    database.settings.adminUsers.push(username)
    fs.writeFileSync(databaseLocation, JSON.stringify(database), "utf-8")
  }
}
