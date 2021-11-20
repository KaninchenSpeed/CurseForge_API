import axios from 'axios'
import { API_ROOT, VERSION_PREFIX } from './api'

export interface RequestOptions {
    api_key?: string
}

export interface Pagination {
    index: number
    pageSize: number
    resultCount: number
    totalCount: number
}

export interface Response<DataType> {
    data: DataType
    pagination?: Pagination
}

/**
 * Requests content from the CurseForge API
 */
export default function APIRequest<DataType>(path: string, options?: RequestOptions) {
    return axios.get<Response<DataType>>(`${API_ROOT}/${VERSION_PREFIX}${path}`, {
        headers: {
            'Accept': 'appliction/json',
            'x-api-key': options?.api_key ?? ''
        },
        transitional: {
            silentJSONParsing: true
        }
    })
}