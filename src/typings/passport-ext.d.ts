type User = {
  username: string
  password: string
}

declare namespace Express {
  export interface Request {
    User: User
    path: string
    params?: any
  }
}
