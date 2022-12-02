export interface ISettingsDatabase {
    name: string
    logo: string
    siteTitle: string
    siteDescription: string
    loginText: string
    appEmoji: string
    captchaEnabled: boolean
    captchaSiteID: string | null
    captchaSecretKey: string | null
    defaultProfilePicture: string
    registrationEnabled: boolean
    privateModeEnabled: boolean
}

export interface IUsersDatabase extends Array<IUserSettings>{}

export interface IUserSettings {
    username: string
    role: "admin" | "user"
    profilePicture: string | null
}