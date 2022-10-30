export interface IDatabase {
    settings: ISettings
    users: Array<IUserSettings>
}

export interface ISettings {
    name: string
    logo: string
    siteTitle: string
    siteDescription: string
    loginText: string
    systemEmoji: string
    defaultProfilePicture: string
    adminUsers: Array<string>
}

export interface IUserSettings {
    username: string
    profilePicture: string | null
    config: IEmbedConfig | null
}

export interface IEmbedConfig {
    header?: string
    headerUrl?: string
    author?: string
    authorLink?: string
    title?: string
    titleLink?: string
    description?: string
    hex?: string
}