"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Vote } from "../../../interfaces/vote";
import { generateHash } from "../../../utilities/hash.utility";
import { useRouter } from "next/navigation";
import { Persistence } from "../../../utilities/persistence.utility";
import { APP, URLS } from "../../../constants";

const Page = () => {
  const [user, setUser] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const router = useRouter();
  const socket = io(URLS.SOCKET);

  const registerUser = () => {
    const newUser: Vote = {
      user,
      vote: "",
      hash: generateHash(new Date().toString() + user),
    };
    emitUser(newUser);
  };

  const emitUser = (newUser: Vote) => {
    socket.emit("newUser", newUser, (success: boolean) => {
      success ? redirectToPockerBoard(newUser) : setShowError(true);
    });
  };

  const redirectToPockerBoard = (newUser: Vote) => {
    saveOnPersistence(newUser);
    router.push("pockerBoard?user=" + newUser.user + "&hash=" + newUser.hash);
  };

  const saveOnPersistence = (newUser: Vote) => {
    Persistence.setItem(APP.USER, JSON.stringify(newUser));
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (user !== "") {
        registerUser();
      }
    }
  };

  const lookForPreviousUser = () => {
    const voteString = Persistence.getItem(APP.USER);
    if (voteString !== "") {
      const previousVote: Vote = JSON.parse(voteString) as Vote;
      emitUser(previousVote);
    }
  };

  useEffect(() => {
    lookForPreviousUser();
  }, []);

  useEffect(() => {
    if (user === "") {
      setShowError(false);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="mt-[-200px] flex gap-1  ">
          <input
            autoFocus
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            className="border-2 border-blue-500 rounded-md px-4 py-4 text-lg focus:outline-none focus:border-blue-500 font-bold text-blue-500"
            placeholder="Escribe tu nombre..."
          />
          <button
            onClick={registerUser}
            hidden={user === ""}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded fade-in"
          >
            OK
          </button>
        </div>
        <div>
          <div hidden={!showError} className="pl-1 text-orange-300 fade-in">
            El usuario ya está ocupado
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
