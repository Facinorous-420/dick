import { Request } from "express"

export interface IExtendedRequest extends Request {
  user?: {
    username?: string
    password?: string
  }
}
