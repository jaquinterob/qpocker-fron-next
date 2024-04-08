"use client";

import AddBoxIcon from "@material-ui/icons/AddBox";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PlayForWorkIcon from "@material-ui/icons/PlayForWork";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";

import React, { useState } from "react";
import { generateHash } from "../../utilities/hash.utility";
import { useRouter } from "next/navigation";
import { URLS } from "../../constants";
import { RoomService } from "@/services/room.service";
import { copy } from "@/utilities/copy.utility";

export default function Home() {
  const [room, setRoom] = useState<string>("");
  const URL = "/pockerBoard?room=";
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const roomService = new RoomService();

  const copyToClipboard = () => {
    copy(URL, room).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const newRoom = () => {
    const hash = generateHash(new Date().toString());
    setRoom(hash);
    roomService
      .saveNewRoom(hash)
      .then((data) => {
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const redirectToSelectUser = () => {
    router.push(`${URL}${room}`);
  };

  const redirectToHistoryRooms = () => {
    router.push("rooms");
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
          <h1 className="text-black italic font-semibold  dark:text-slate-300">Nueva sala:</h1>
          <div className="room flex gap-2 pt-3 flex-col md:flex-row px-4  md:py-4 dark:text-slate-300 ">
            <div className="w-[200px]  md:w-[500px] border-2 border-black dark:border-slate-300 rounded-md pt-3 px-3 text-lg font-bold overflow-hidden whitespace-nowrap text-ellipsis">
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
      <div
        onDoubleClick={redirectToHistoryRooms}
        className="absolute bottom-0 p-2 text-transparent hover:text-black dark:hover:text-slate-300 transition cursor-none"
      >
        <ChangeHistoryIcon />
      </div>
    </div>
  );
}
