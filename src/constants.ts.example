import { templatePathBuilder } from "./utils/utils"

/* ------------------- ASS HOST INFORMATION ------------------------ */
// Boolean variable if your ASS is secured with HTTPS
// true = https | false = http
export const ASS_SECURE = false

// This is the domain your ASS is hosted at: "127.0.0.1" | "cdn.domain.com"
export const ASS_DOMAIN = "127.0.0.1:40115"

// DICK will need to know where your ASS is installed
// Do note that it must be a *relative* location.
// For example "../ass" means ass is installed in the parent directory.
export const ASS_LOCATION = "../ass"

/* ------------------- SYSTEM CONSTANTS ------------------------ */
// Port to run the server on, change if you have something else running on that port
export const PORT = "3000"

/* ------------------- TEMPLATE PATH CONSTANTS ------------------------ */
export const TEMPLATE = {
  USER: templatePathBuilder("/user.ejs"),
  PUBLIC: templatePathBuilder("/public.ejs"),
  ERRORS: {
    403: templatePathBuilder("/errors/403.ejs"),
    404: templatePathBuilder("/errors/404.ejs")
  }
}
