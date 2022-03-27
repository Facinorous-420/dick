import { DICK_SUBMODULE, ASSLOCATION } from "../CONSTANTS"
import fs from "fs"
import path from "path"
import { ASSItem } from "typings/ASSTypes"
    
    let DATA_FILE_PATH = path.resolve(`${ASSLOCATION}/data.json`)
    let AUTH_FILE_PATH = path.resolve(`${ASSLOCATION}/auth.json`)
    if (DICK_SUBMODULE !== false) {
      DATA_FILE_PATH = path.resolve(`data.json`)
      AUTH_FILE_PATH = path.resolve(`auth.json`)
    }

    export const parseDataFile = () => {
      const rawDataJson = JSON.parse(fs.readFileSync(DATA_FILE_PATH).toString())
      console.log(DATA_FILE_PATH)
      // Parsed users, raw file stores the password as the key in the json file
      const allDataIDs = Object.keys(rawDataJson)
      
      // Create a new object to contain the important information we use
      const allData: any[] | Array<ASSItem> = []
      for (const id of allDataIDs) {
        const fileType = Object.keys(rawDataJson[id].is).filter((type: any) => rawDataJson[id].is[type])
        allData.push({
      id,
      deleteId: rawDataJson[id].deleteId,
      type: fileType,
      thumbnailName: rawDataJson[id].thumbnail,
      originalName: rawDataJson[id].originalname,
      fileExtension: rawDataJson[id].ext,
      fileLocation: rawDataJson[id].path,
      timestamp: rawDataJson[id].timestamp,
      size: rawDataJson[id].size,
      owner: rawDataJson[id].token
        })
      }

      return allData
    }

export const parseAuthFile = () => {
  const rawAuthJson = JSON.parse(fs.readFileSync(AUTH_FILE_PATH).toString())

  const unparsedAuthUsers = rawAuthJson.users

  // Parsed users, raw file stores the password as the key in the json file
  const Allpasswords = Object.keys(unparsedAuthUsers)

  // Create a new object to contain login information in a more standard
  // Way, a list with multiple objects containing the keys "username" and "password"
  const allUsers = []
  for (const password of Allpasswords) {
    allUsers.push({
      username: unparsedAuthUsers[password].username,
      password,
      count: unparsedAuthUsers[password].count
    })
  }

  return allUsers
}