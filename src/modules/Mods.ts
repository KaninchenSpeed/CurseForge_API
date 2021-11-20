import request from '../lib/APIrequest'
import type { Category } from './Categories'
import type { File, GameVersion } from './Files'

export interface Links {
    websiteUrl: string
    wikiUrl: string
    issuesUrl: string
    sourceUrl: string
}

export interface Author {
    id: number
    name: string
    url: string
}

export interface Image {
    id: number
    modId: number
    title: string
    description: string
    thumbnailUrl: string
    url: string
}

export interface Mod {
    id: number
    gameId: number
    name: string
    slug: string
    links: Links
    summary: string
    status: number
    downloadCount: number
    isFeatured: boolean
    primaryCategoryId: number
    categories: Category[]
    authors: Author[]
    logo: Image
    screenshots: Image[]
    mainFileId: number
    latestFiles: File[]
    latestFilesIndexes: GameVersion[]
    dateCreated: string
    dateModified: string
    dateReleased: string
}

export interface SearchFilter {
    gameId?: number
    classId?: number
    categoryId?: number
    gameVersion?: string
    searchFilter?: string
    sortField?: any
    sortOrder?: boolean
    modLoaderType?: any
    gameVersionTypeId?: number
    index?: number
    pageSize?: number
}

export default class Mods {

    private api_key: string

    /**
     * 
     * @param api_key A CurseForge API Key
     * A private game is only accessible to its respective API key.
     */
    constructor(api_key: string) {
        this.api_key = api_key
    }

    /**
     * Get all mods that match the search criteria.
     * 
     * @param filter filtering for search results
     */
    async search(filter: SearchFilter) {
        const res = await request<Mod[]>(`/mods/search`, { api_key: this.api_key, query: filter })
        if (res.status == 500) throw 'Internal Server Error'
        if (res.status == 404) throw 'Not Found'
        return res.data.data
    }

    /**
     * Get a single mod.
     * 
     * @param modID The mod id
     */
    async getMod(modID: number) {
        const res = await request<Mod>(`/mods/${modID}`, { api_key: this.api_key })
        if (res.status == 500) throw 'Internal Server Error'
        if (res.status == 404) throw 'Not Found'
        return res.data.data
    }

    /**
     * Get a list of mods.
     * 
     * @param modIDs The mod ids
     */
    async getMods(...modIDs: number[]) {
        const res = await request<Mod[]>('/mods', { api_key: this.api_key, body: { modIDs } })
        if (res.status == 500) throw 'Internal Server Error'
        if (res.status == 400) throw 'Bad Request'
        return res.data.data
    }

    /**
     * Get a list of featured, popular and recently updated mods.
     * 
     * @param gameID A game unique id
     * @param excludedMods The excluded mod ids
     * @param gameVersionID The gameVersionTypeId
     */
    async getFeatured(gameID: number, excludedMods: number[], gameVersionID: number) {
        const res = await request<{featured: Mod[], popular: Mod[], recentlyUpdated: Mod[]}>('/mods/featured', { api_key: this.api_key, body: {
            gameId: gameID,
            excludedModIds: excludedMods,
            gameVersionTypeId: gameVersionID
        }})
        if (res.status == 500) throw 'Internal Server Error'
        if (res.status == 400) throw 'Bad Request'
        if (res.status == 404) throw 'Not Found'
        return res.data.data
    }

    /**
     * Get the full description of a mod in HTML format.
     * 
     * @param modID The mod id
     */
    async getModDescription(modID: number) {
        const res = await request<string>(`/mods/${modID}/description`)
        if (res.status == 500) throw 'Internal Server Error'
        if (res.status == 404) throw 'Not Found'
        return res.data.data
    }

}