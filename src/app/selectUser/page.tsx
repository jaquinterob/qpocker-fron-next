"use client";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useRouter, useSearchParams } from "next/navigation";
import { APP, URLS } from "../../../constants";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

const Page = () => {
  const URL = URLS.SERVER + "pockerBoard?room=";
  const [user, setUser] = useState<string>("");
  const searchParams = useSearchParams();
  const [showError, setShowError] = useState<boolean>(false);
  const roomParam = searchParams.get("room") || "";
  const router = useRouter();
  const socket = io(URLS.SOCKET, {
    query: { room: roomParam },
  });

  const registerUser = (): void => {
    socket.emit(
      "existsUser",
      { user, value: 0 },
      roomParam,
      (existsUser: boolean) => {
        if (existsUser) {
          setShowError(true);
        } else {
          window.localStorage.setItem(APP.USER, user);
          router.push(`${URL}${roomParam}`);
        }
      }
    );
  };

  return (
    <div className="flex justify-center mt-10 fade-in">
      <div>
        <div className=" flex gap-1  ">
          <input
            autoFocus
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
              setShowError(false);
            }}
            type="text"
            className="white-input"
            placeholder="Escribe tu nombre..."
          />
          <button
            hidden={user === "" || showError}
            onClick={registerUser}
            className="white-button"
          >
            <DoneOutlineIcon />
          </button>
        </div>
        <div>
          <div
            hidden={!showError}
            className="pl-1 text-black fade-in font-light"
          >
            Ya exite el usuario '
            <strong className="font-extrabold text-gray-700">{user}</strong>' en
            la sala.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
