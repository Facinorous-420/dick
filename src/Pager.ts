import { Response } from "express"
import { parseAuthFile, parseDataFile } from "./utils/assJSONStructure"
import { RenderOptions } from "./typings/Pager"
import { ASSDOMAIN, ASSSECURE, STAFF_IDS } from "./CONSTANTS"
import { convertTimestamp, formatSize } from "./utils/utils"
import { ASSUser, ASSItem } from "./typings/ASSTypes"
import { IExtendedRequest } from "./typings/express-ext"

export class Pager {
  /**
   * Process and render the specified template with provided options
   */
  static async render(
    res: Response,
    req: IExtendedRequest,
    template: string,
    options?: RenderOptions
  ) {
    if (!options) options = { params: {} }
    if (!options.params) options.params = []

    const data: Array<ASSItem> = parseDataFile()
    const users: Array<ASSUser> = parseAuthFile()

    // If user is already authenticated load the authenticated data
    if (req.isAuthenticated()) {
      return this.renderAuthenticatedData(res, req, template, options, data, users)
    }
    
    // If user is not authenticated only load guest data
    return this.renderUnauthenticatedData(res, req, template, options, data, users)
  }

  /**
   * Renders templates for unauthenticated templates
   */
   static async renderUnauthenticatedData(
    res: Response,
    req: IExtendedRequest,
    template: string,
    options: RenderOptions,
    data: Array<ASSItem>,
    users: Array<ASSUser>
  ) {
    const totalUsers = users.length
    const totalData = data.length
    const totalSize = formatSize(data.map(item => item.size).reduce((prev, curr) => prev + curr, 0))

    const baseData = {
      params: options.params,
      path: req.path,
      totalUsers,
      totalData,
      totalSize
    }

    // We render template using the absolute path of the template and the merged default data with the additional data provided.
    return res.render(template, Object.assign(baseData, options))
  }

  /**
   * Renders templates for authenticated templates,
   */
  // eslint-disable-next-line complexity
  static async renderAuthenticatedData(
    res: Response,
    req: IExtendedRequest,
    template: string,
    options: RenderOptions,
    data: Array<ASSItem>,
    users: Array<ASSUser>
  ) {
    // * -------------------- BUILD DATA OBJECT FOR FRONTEND EJS VARIABLES ------------
    const totalUsers = users.length
    const totalData = data.length
    const totalSize = formatSize(data.map(item => item.size).reduce((prev, curr) => prev + curr, 0))
    const hasRole = STAFF_IDS.indexOf(req.user.username) > -1
    // Get all the specific users file information, using secret key to match
    const usersData = data.filter(item => item.owner == req.user.password).map((item) => ({
      ...item, 
      timestamp: convertTimestamp(item.timestamp)
    })).sort((a, b) => {
      let da = new Date(a.timestamp),
          db = new Date(b.timestamp)
          return db.getTime() - da.getTime()
    })

    // I feel like this could be done better, but I created an object filled with useful variables for the user data to be rendered on the pages
    const usersDataObj = {
      data: usersData,
      allImages: usersData.filter(item=> item.type.includes('image')),
      allVideos: usersData.filter(item=> item.type.includes('video')),
      allFiles: usersData.filter(item=> item.type.includes('file')),
      allOthers: usersData.filter(item=> item.type.includes('other')),
      totalSize:formatSize(usersData.map(item => item.size).reduce((prev, curr) => prev + curr, 0)),
      totalImageSize: formatSize(usersData.filter(item=> item.type.includes('image')).map(item => item.size).reduce((prev, curr) => prev + curr, 0)),
      totalVideosSize: formatSize(usersData.filter(item=> item.type.includes('video')).map(item => item.size).reduce((prev, curr) => prev + curr, 0)),
      totalFilesSize: formatSize(usersData.filter(item=> item.type.includes('file')).map(item => item.size).reduce((prev, curr) => prev + curr, 0)),
      totalOthersSize: formatSize(usersData.filter(item=> item.type.includes('other')).map(item => item.size).reduce((prev, curr) => prev + curr, 0))
    }
    
    let targetDataObj = {}
    // If the user is staff and is trying to view another users information, we will grab it here to render that as well..
    /*
    if (options.params.userID) {
    const targetData = data.filter((item: ASSItem ) => (item: { owner: string }) => item.owner == options.params.userID)
      targetDataObj = {
        data: targetData,
        allImages: targetData.filter(item=> item.type.includes('image')),
        allVideos: targetData.filter(item=> item.type.includes('video')),
        allFiles: targetData.filter(item=> item.type.includes('file')),
        allOthers: targetData.filter(item=> item.type.includes('other')),
        totalSize:formatSize(targetData.map(item => item.size).reduce((prev, curr) => prev + curr, 0)),
        totalImageSize: formatSize(targetData.filter(item=> item.type.includes('image')).map(item => item.size).reduce((prev, curr) => prev + curr, 0)),
        totalVideosSize: formatSize(targetData.filter(item=> item.type.includes('video')).map(item => item.size).reduce((prev, curr) => prev + curr, 0)),
        totalFilesSize: formatSize(targetData.filter(item=> item.type.includes('file')).map(item => item.size).reduce((prev, curr) => prev + curr, 0)),
        totalOthersSize: formatSize(targetData.filter(item=> item.type.includes('other')).map(item => item.size).reduce((prev, curr) => prev + curr, 0))
      }
    }
    */

    const baseData = {
      assDomain: ASSDOMAIN,
      assSecure: ASSSECURE,
      user: req.user,
      totalSize,
      totalUsers,
      totalData,
      usersDataObj,
      //targetDataObj: options.params.userID ? targetDataObj : null,
      params: options.params,
      path: req.path,
      hasRole
    }

    return res.render(template, Object.assign(baseData, options))
  }
}
