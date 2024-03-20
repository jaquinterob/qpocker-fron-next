"use client";

import AddBoxIcon from "@material-ui/icons/AddBox";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PlayForWorkIcon from "@material-ui/icons/PlayForWork";

import React, { useState } from "react";
import { generateHash } from "../../utilities/hash.utility";
import { useRouter } from "next/navigation";
import { Room } from "@material-ui/icons";
import { APP, ROUTES, URLS } from "../../../constants";

export default function Home() {
  const [room, setRoom] = useState<string>("");
  const URL = URLS.SERVER + "pockerBoard?room=";
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(URL + room)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Reiniciar el estado después de 1.5 segundos
      })
      .catch((err) => console.error("Error al copiar al portapapeles: ", err));
  };

  const newRoom = () => {
    const hash = generateHash(new Date().toString());
    setRoom(hash);
    fetch(`${URLS.SOCKET}/${ROUTES.ROOM}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hash }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hubo un problema con la petición.");
        }
        return response.json(); // Devuelve una promesa que resuelve con los datos JSON de la respuesta
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // Hacer algo con los datos de la respuesta
      })
      .catch((error) => {
        console.error("Error:", error);
        // Manejar el error
      });
  };

  const redirectToSelectUser = () => {
    router.push(`${URL}${room}`);
  };
  return (
    <div className="flex flex-col pt-10 fade-in">
      <div className="flex justify-center gap-2 ">
        <div onClick={newRoom} className="white-button">
          <AddBoxIcon className="mr-2 -mt-1" />
          NUEVA SALA
        </div>
      </div>
      {room !== "" && (
        <div className="flex flex-col items-center pt-6 fade-in">
          <h1 className="text-black italic font-semibold ">Nueva sala:</h1>
          <div className="room flex gap-2 pt-3 flex-col md:flex-row px-4  md:py-4 ">
            <div className="w-[200px]  md:w-[500px] border-2 border-black rounded-md px-4 py-2 text-lg font-bold overflow-hidden whitespace-nowrap text-ellipsis">
              {`${URL}${room}`}
            </div>
            <button onClick={copyToClipboard} className="white-button">
              <FileCopyIcon className="mr-2" />
              {copied ? "copiado!" : "copiar"}
            </button>
            <button onClick={redirectToSelectUser} className="white-button">
              <PlayForWorkIcon className="mr-2 mb-1" />
              Entrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
