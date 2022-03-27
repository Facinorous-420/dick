export interface ASSUser {
    username: string
    password: string
    count: number
}

export interface ASSItem {
    id: string
    deleteId: string
    type: Array<string>
    thumbnailName: string
    originalName: string
    fileExtension: string
    fileLocation: string
    timestamp: number
    size: number
    owner: string
}