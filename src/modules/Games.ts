import request from '../lib/APIrequest'
import type { Pagination } from '../lib/APIrequest'

export interface Game {
    id: number,
    name: string,
    slug: string,
    dateModified: string,
    assets: {
        iconUrl: string,
        tileUrl: string,
        coverUrl: string
    },
    status: number,
    apiStatus: number
}

export interface GameVersion {
    type: number
    versions: string[]
}

export interface GameVersionType {
    id: number,
    gameId: number,
    name: string,
    slug: string
}

export default class Games {

    private api_key

    /**
     * 
     * @param api_key A CurseForge API Key
     * A private game is only accessible to its respective API key.
     */
    constructor(api_key: string) {
        this.api_key = api_key
    }

    /**
     * Get all games that are available to the provided API key.
     */
    async getGames(): Promise<{ games: Game[], pagination?: Pagination}> {
        const res = await request<Game[]>('/games', { api_key: this.api_key })
        if (res.status == 500) throw 'Internal Server Error'
        return {
            games: res.data.data,
            pagination: res.data.pagination
        }
    }

    /**
     * Get a single game.
     * A private game is only accessible by its respective API key.
     * 
     * @param gameID A game unique id
     */
    async getGame(gameID: number): Promise<Game> {
        const res = await request<Game>(`/games/${gameID}`, { api_key: this.api_key })
        if (res.status == 500) throw 'Internal Server Error'
        if (res.status == 404) throw 'Not Found'
        return res.data.data
    }

    /**
     * Get all available versions for each known version type of the specified game. 
     * 
     * @param gameID A game unique id
     */
    async getVersions(gameID: number,): Promise<GameVersion[]> {
        const res = await request<GameVersion[]>(`/games/${gameID}/versions`, { api_key: this.api_key })
        if (res.status == 500) throw 'Internal Server Error'
        if (res.status == 404) throw 'Not Found'
        return res.data.data
    }

    /**
     * Get all available version types of the specified game.
     * 
     * Currently, when creating games via the CurseForge Core Console, you are limited to a single game version type.
     * This means that this endpoint is probably not useful in most cases and is relevant mostly when handling existing
     * games that have multiple game versions such as World of Warcraft and Minecraft (e.g. 517 for wow_retail).
     * 
     * @param gameID A game unique id
     */
    async getVersionTypes(gameID: number): Promise<GameVersionType[]> {
        const res = await request<GameVersionType[]>(`/games/${gameID}/version-types`, { api_key: this.api_key })
        if (res.status == 500) throw 'Internal Server Error'
        if (res.status == 404) throw 'Not Found'
        return res.data.data
    }

}