"use client";

import AddBoxIcon from "@material-ui/icons/AddBox";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PlayForWorkIcon from "@material-ui/icons/PlayForWork";

import React, { useState } from "react";
import { generateHash } from "../../utilities/hash.utility";
import { useRouter } from "next/navigation";
import { Room } from "@material-ui/icons";

export default function Home() {
  const [room, setRoom] = useState<string>("");
  const URL = "http://localhost:3001/selectUser?room=";
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
    setRoom(generateHash(new Date().toString()));
  };

  const redirectToSelectUser = () => {
    router.push(`${URL}${room}`);
  };
  return (
    <>
      <div className="flex flex-col mt-10 fade-in">
        <div className="flex justify-center gap-2 ">
          <div onClick={newRoom} className="white-button">
            <AddBoxIcon className="mr-2 -mt-1" />
            NUEVA SALA
          </div>
        </div>
        {room !== "" && (
          <div className="flex flex-col items-center mt-6 fade-in ">
            <h1 className="text-black italic font-semibold ">
              Comparte este link:
            </h1>
            <div className="room flex gap-2 mt-3">
              <div className="border-2 border-black rounded-md px-4 py-2 text-lg font-bold">
                {`${URL}${room}`}
              </div>
              <button onClick={copyToClipboard} className="white-button">
                <FileCopyIcon className="mr-2" />
                {copied ? "copiado!" : "copiar"}
              </button>
              <button onClick={redirectToSelectUser} className="white-button">
                <PlayForWorkIcon className="mr-2 mb-1" />
                Ingresar a la sala
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
