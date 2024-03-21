import { ROUTES, URLS } from "../constants";

export class RoomService {
  async saveNewRoom(hash: string): Promise<any> {
    const response = await fetch(`${URLS.SOCKET}${ROUTES.ROOM}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ hash }),
      });
      if (!response.ok) {
          throw new Error("Hubo un problema con la petición.");
      }
      return await response.json();
  }
}
