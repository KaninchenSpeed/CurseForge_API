import Games from "./modules/Games";
import Categories from "./modules/Categories";
import Mods from "./modules/Mods";
import Files from "./modules/Files";

export default interface CurseForge {
  Games: Games;
  Categories: Categories;
  Mods: Mods;
  Files: Files;
}

export default class CurseForge {
  private api_key: string;

  /**
   * Creates a new instance of the CurseForge API
   *
   * @param api_key A CurseForge API Key
   * A private game is only accessible to its respective API key.
   */
  constructor(api_key: string) {
    this.api_key = api_key;
    this.Games = new Games(this.api_key);
    this.Categories = new Categories(this.api_key);
    this.Mods = new Mods(this.api_key);
    this.Files = new Files(this.api_key);
  }
}
