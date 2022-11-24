import path from "path"
import fs from "fs-extra"

import { ISettingsDatabase, IUsersDatabase, IUserSettings } from "typings/database"
import { ASS_LOCATION } from "../constants"
import { parseAuthFile } from "./assJSONStructure"
import { Log } from "@callmekory/logger/lib"

const settingsDatabaseLocation = path.resolve(`./src/database/settings.json`)
const userDatabaseLocation = path.resolve(`./src/database/users.json`)

/////////////////////////////
//
//  Get Database Files
//
/////////////////////////////

// Get settings database, creating a default one if it doesnt exist
export const getSettingsDatabase = (): ISettingsDatabase => {
    try {
        const databaseFile = fs.readFileSync(settingsDatabaseLocation).toString()
        const database: ISettingsDatabase = JSON.parse(databaseFile)
        return database
    } catch (error) {
        const defaultDatabase: ISettingsDatabase = {
            name: "dick",
            appEmoji: "🍆",
            siteTitle: "DICK (Directly Integrated Client for Keisters)",
            siteDescription: "The frontend for your backend",
            loginText: "Sign in to easily manage your nudes.",
            captchaEnabled: false,
            captchaSiteID: null,
            registrationEnabled: false,
            privateModeEnabled: false,
            logo: "./images/logo.png",
            defaultProfilePicture: "./images/profile.png"
        }
        fs.writeJsonSync(settingsDatabaseLocation, defaultDatabase, { spaces: 4 })
        return defaultDatabase
    }
}

// Get users database, creating a default one if it doesnt exist
export const getUserDatabase = (): IUsersDatabase => {
    try {
        const databaseFile = fs.readFileSync(userDatabaseLocation).toString()
        const database: IUsersDatabase = JSON.parse(databaseFile)
        return database
    } catch (error) {
        const defaultDatabase: IUsersDatabase = []
        fs.writeJsonSync(userDatabaseLocation, defaultDatabase, { spaces: 4 })
        return defaultDatabase
    }
}

// Get users database object, creating a default one if it doesnt exist
export const getUserDatabaseObj = (username: string): IUserSettings | null => {
    try {
        const database = getUserDatabase()
        const user = database.find((e: IUserSettings) => e.username === username)
        if (!user) {
            let newUser: IUserSettings

            // If there are no users in the database yet, we will make this user the admin (first user to login will always be admin)
            if (database.length == 0) {
                newUser = {
                    username: username,
                    role: "admin",
                    profilePicture: null
                }
            } else {
                // Else we add the user to the database as a regular user
                newUser = {
                    username: username,
                    role: "user",
                    profilePicture: null
                }
            }
            database.push(newUser)
            fs.writeJsonSync(userDatabaseLocation, database, { spaces: 4 })
            return user
        }
        return user
    } catch (error) {
        Log.error(error)
        return null
    }
}

/////////////////////////////
//
//  MISC
//
/////////////////////////////

/**
 * Checks if the user is in ASS database, returns true if the user exists, or false if it does not
 * @param username Username we are checking exists
 * @param token? If passed, will also check ASS token
 */
export const checkIfUserExistInASS = async (username: string, token?: string): Promise<boolean> => {
    const assUserDatabase = parseAuthFile()
    let result = false

    // Check if the user exists in the ASS Database
    const assUsernameResult = assUserDatabase.find((user) => user.username === username) ? true : false
    if (token) {
        const assTokenResult = assUserDatabase.find((user) => user.password === token) ? true : false
        if (assUsernameResult || assTokenResult) {
            result = true
        }
    }
    if (assUsernameResult) {
        result = true
    }

    // Return true if any of the checks above found the user, else return false
    return result
}

/**
 * Checks if the user is in our local JSON database, returns true if the user exists, or false if it does not
 * @param username Username we are checking exists
 */
export const checkIfUserExistInDICK = async (username: string): Promise<boolean> => {
    const dickUserDatabase = getUserDatabase()
    let result = false

    // Check if the user exists in the DICK Database
    if (dickUserDatabase.find((e: IUserSettings) => e.username === username)) {
        result = true
    }

    // Return true if any of the checks above found the user, else return false
    return result
}

/**
* Registers a new user to ASS
* @param username Username we will create
* @param password Password we will use
*/
export const createUserInASS = async (username: string, password: string) => {
    const AUTH_FILE_PATH = path.resolve(`${ASS_LOCATION}/auth.json`)

    fs.readJson(AUTH_FILE_PATH)
        .then((auth) => {
            auth.users[password] = { username, count: 0 }
            fs.writeJsonSync(AUTH_FILE_PATH, auth, { spaces: 4 })
        })
}

/**
* Registers a new user to DICK
* @param username Username we will create
*/
export const createUserInDICK = async (username: string) => {
    const userDatabase = getUserDatabase()

    // If user does not exist in our database, we create it
    if (!userDatabase.find((e: IUserSettings) => e.username === username)) {
        let newUser: IUserSettings

        // If there are no users in the database yet, we will make this user the admin (first user to login will always be admin)
        if (userDatabase.length == 0) {
            newUser = {
                username: username,
                role: "admin",
                profilePicture: null
            }
        } else {
            // Else we add the user to the database as a regular user
            newUser = {
                username: username,
                role: "user",
                profilePicture: null
            }
        }

        userDatabase.push(newUser)
        fs.writeJsonSync(userDatabaseLocation, userDatabase, { spaces: 4 })
    }
}

/**
 * Cycles through all users in the ASS auth database and adds them to the DICk user database
 * if they are not already in it.
*/
export const syncAssUsersToDick = () => {
    const assUserDatabase = parseAuthFile()
    const dickUserDatabase = getUserDatabase()

    if(dickUserDatabase.length !== 0){
        for (const user of assUserDatabase) {
            if (!dickUserDatabase.find((e: IUserSettings) => e.username === user.username)) {
                createUserInDICK(user.username)
            }
        }
    }

}
