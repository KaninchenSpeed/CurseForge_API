import axios from "axios";
import { API_ROOT, VERSION_PREFIX } from "./api";

export interface RequestOptions {
  api_key?: string;
  query?: { [key: string]: any };
  body?: { [key: string]: any };
}

export interface Pagination {
  index: number;
  pageSize: number;
  resultCount: number;
  totalCount: number;
}

export interface Response<DataType> {
  data: DataType;
  pagination?: Pagination;
}

/**
 * Requests content from the CurseForge API
 */
export default function APIRequest<DataType>(
  path: string,
  options?: RequestOptions
) {
  const params = Object.keys(options?.query ?? {}).map((key) => {
    return {
      name: key,
      value: String(options?.query ? options?.query[key] : undefined),
    };
  });
  if (options?.body) {
    return axios.post<Response<DataType>>(
      `${API_ROOT}/${VERSION_PREFIX}${path}${
        params.length > 0
          ? `?${params.map((p) => `${p.value}=${p.value}`).join("&")}`
          : ""
      }`,
      options.body,
      {
        headers: {
          Accept: "appliction/json",
          "Content-Type": "appliction/json",
          "x-api-key": options?.api_key ?? "",
        },
        transitional: {
          silentJSONParsing: true,
        },
      }
    );
  } else {
    return axios.get<Response<DataType>>(
      `${API_ROOT}/${VERSION_PREFIX}${path}${
        params.length > 0
          ? `?${params.map((p) => `${p.value}=${p.value}`).join("&")}`
          : ""
      }`,
      {
        headers: {
          Accept: "appliction/json",
          "x-api-key": options?.api_key ?? "",
        },
        transitional: {
          silentJSONParsing: true,
        },
      }
    );
  }
}
