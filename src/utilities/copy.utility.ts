export const copy = async (URL: string, room: string): Promise<any> => {
  try {
    return await navigator.clipboard.writeText(URL + room);
  } catch (err) {
    return console.error("Error al copiar al portapapeles: ", err);
  }
};
