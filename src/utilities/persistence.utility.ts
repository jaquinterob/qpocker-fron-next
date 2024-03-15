export class Persistence {
  static setItem(name: string, item: string) {
    localStorage.setItem(name, item);
  }
  static getItem(name: string): string {
    return localStorage.getItem(name) || "";
  }
}
