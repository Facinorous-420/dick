import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const logoStorage = multer.diskStorage({
    destination: (request: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
        callback(null, 'src/public/images')
    },
    filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
        callback(null,'logo.png')
    }
})

export const defaultPPStorage = multer.diskStorage({
    destination: (request: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
        callback(null, 'src/public/images')
    },
    filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
        callback(null,'profile.png')
    }
})
  
export const imageFileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
  }