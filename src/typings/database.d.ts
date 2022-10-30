export interface IDatabase {
    settings: ISettings
    users: Array<IUserSettings>
}

export interface ISettings {
    name: string
    logo: string | null
    systemEmoji: string
    defaultProfilePicture: string | null
    adminUsers: Array<string>
}

export interface IUserSettings {
    username: string
    profilePicture: string | null
    config: IEmbedConfig | null
}

export interface IEmbedConfig {
    header: string | null
    headerUrl: string | null
    author: string | null
    authorLink: string | null
    title: string | null
    titleLink: string  | null
    description: string | null
    hex: string | null
}