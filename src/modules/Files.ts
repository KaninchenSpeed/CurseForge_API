

export interface FileHash {
    value: string
    algo: number
}

export interface GameVersion {
    gameVersionName: string
    gameVersionPadded: string
    gameVersion: string
    gameVersionReleaseDate: string
    gameVersionTypeId: number
}

export interface Module {
    name: string
    fingerprint: number
}

export interface SimpleFile {
    modId: number
    fileId: number
    relationType: number
}

export interface File {
    id: number
    gameId: number
    modId: number
    isAvailable: boolean
    displayName: string
    fileName: string
    releaseType: number
    fileStatus: number
    hashes: FileHash[]
    fileDate: string
    fileLength: number
    downloadCount: number
    downloadUrl: string
    gameVersions: string[]
    sortableGameVersions: GameVersion[]
    dependencies: SimpleFile[]
    exposeAsAlternative: boolean
    parentProjectFileId: number
    alternateFileId: number
    isServerPack: boolean
    serverPackFileId: number
    fileFingerprint: number
    modules: Module[]
}

export default class Files {

    private api_key: string

    /**
     * 
     * @param api_key A CurseForge API Key
     * A private game is only accessible to its respective API key.
     */
    constructor(api_key: string) {
        this.api_key = api_key
    }

}