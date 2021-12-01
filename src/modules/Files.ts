import request from "../lib/APIrequest";

export interface FileHash {
  value: string;
  algo: number;
}

export interface GameVersion {
  gameVersionName: string;
  gameVersionPadded: string;
  gameVersion: string;
  gameVersionReleaseDate: string;
  gameVersionTypeId: number;
}

export interface Module {
  name: string;
  fingerprint: number;
}

export interface SimpleFile {
  modId: number;
  fileId: number;
  relationType: number;
}

export interface File {
  id: number;
  gameId: number;
  modId: number;
  isAvailable: boolean;
  displayName: string;
  fileName: string;
  releaseType: number;
  fileStatus: number;
  hashes: FileHash[];
  fileDate: string;
  fileLength: number;
  downloadCount: number;
  downloadUrl: string;
  gameVersions: string[];
  sortableGameVersions: GameVersion[];
  dependencies: SimpleFile[];
  exposeAsAlternative: boolean;
  parentProjectFileId: number;
  alternateFileId: number;
  isServerPack: boolean;
  serverPackFileId: number;
  fileFingerprint: number;
  modules: Module[];
}

export default class Files {
  private api_key: string;

  /**
   *
   * @param api_key A CurseForge API Key
   * A private game is only accessible to its respective API key.
   */
  constructor(api_key: string) {
    this.api_key = api_key;
  }

  /**
   * Get a single file of the specified mod.
   *
   * @param modID The mod id
   * @param fileID The file id
   */
  async getModFile(modID: number, fileID: number) {
    const res = await request<File>(`/mods/${modID}/files/${fileID}`, {
      api_key: this.api_key,
    });
    if (res.status == 500) throw "Internal Server Error";
    if (res.status == 404) throw "Not Found";
    return res.data.data;
  }

  /**
   * Get all files of the specified mod.
   *
   * @param modID The mod id
   */
  async getModFiles(modID: number) {
    const res = await request<File[]>(`/mods/${modID}/files`, {
      api_key: this.api_key,
    });
    if (res.status == 500) throw "Internal Server Error";
    if (res.status == 404) throw "Not Found";
    return res.data.data;
  }

  /**
   * Get a list of files.
   *
   * @param fileIDs The file ids
   */
  async getFiles(...fileIDs: number[]) {
    const res = await request<File[]>("/mods/files", {
      api_key: this.api_key,
      body: {
        fileIds: fileIDs,
      },
    });
    if (res.status == 500) throw "Internal Server Error";
    if (res.status == 404) throw "Not Found";
    if (res.status == 400) throw "Bad Request";
    return res.data.data;
  }

  /**
   * Get the changelog of a file in HTML format.
   *
   * @param modID The mod id
   * @param fileID The file id
   */
  async getFileChangelog(modID: number, fileID: number) {
    const res = await request<string>(
      `/mods/${modID}/files/${fileID}/changelog`,
      { api_key: this.api_key }
    );
    if (res.status == 500) throw "Internal Server Error";
    if (res.status == 404) throw "Not Found";
    return res.data.data;
  }

  /**
   * Get a download url for a specific file.
   *
   * @param modID The mod id
   * @param fileID The file id
   */
  async getFileDownloadURL(modID: number, fileID: number) {
    const res = await request<string>(
      `/mods/${modID}/files/${fileID}/download-url`,
      { api_key: this.api_key }
    );
    if (res.status == 500) throw "Internal Server Error";
    if (res.status == 404) throw "Not Found";
    return res.data.data;
  }
}
