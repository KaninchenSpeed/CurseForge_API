import request from "../lib/APIrequest";

export interface Category {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  url: string;
  iconUrl: string;
  dateModified: string;
  isClass: boolean;
  classId: number;
  parentCategoryId: number;
}

export default class Categories {
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
   * WIP - not working - dummy
   * URL schema unknown
   *
   * Get all available classes and categories of the specified game. Specify a game id
   * for a list of all game categories, or a class id for a list of categories under that class.
   *
   * @param gameID A game unique id
   * @param classID A class unique id
   */
  async getCategories(gameID: number, classID: number) {
    const res = await request<Category[]>(`/categories`, {
      api_key: this.api_key,
    });
    return res.data.data;
  }
}
