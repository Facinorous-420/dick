import { join, normalize } from "path"

/**
 * Generate the appropriate pathing for the a template to be rendered
 */
export const templatePathBuilder = (templatePath: string) => {
  const templateDir = normalize(join(__dirname, "..", "..", "views"))

  return normalize(join(templateDir, "templates", templatePath))
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


