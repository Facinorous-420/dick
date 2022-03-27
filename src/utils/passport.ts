import passport from "passport"
import { Strategy } from "passport-local"
import { parseAuthFile } from "./assJSONStructure"

passport.use(
  new Strategy(async (username: string, password: string, done: any) => {
    const allUsers = parseAuthFile()

    // Check if username exists
    const User = allUsers.find((user) => user.username === username)
    if (!User) return done(null, false, { message: 'Username does not exist!' })

    // Compare bcrypt password hash to the supplied password
    // ! UNCOMMENT THIS WHEN BCRYPT IS ENABLED LATER ON FOR PASSWORD HASHING TO WORK CORRECTLY
    // const isPassCorrect = bcrypt.compareSync(password, user.passwordHash)
    const isPassCorrect = password == User.password ? true : false

    // If password is incorrent return a null user object to the auth callback
    if (!isPassCorrect) return done(null, false, { message: 'Password is incorrect!' })

    // If password is correct return the entire user object
    return done(null, User)
  })
)

// Deserializing and serializing users without any additional logic.
passport.serializeUser((user: User, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))

module.exports = { passport }
