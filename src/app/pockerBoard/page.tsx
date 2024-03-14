"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Vote } from "../../../interfaces/vote";
import VoteCard from "../../components/VoteCard";
import { APP, URLS } from "../../../constants";
import VoteSelect from "@/components/VoteSelect";

export default function PockerBoard() {
  const initialSelectVotes = [1, 2, 3, 5, 8, 13, 21];
  const searchParams = useSearchParams();
  const userParam = searchParams.get("user") || "";
  const hashParam = searchParams.get("hash") || "";
  const [votes, setVotes] = useState<Vote[]>([]);
  const [vote, setVote] = useState<number | string>("");
  const [selectVotes, setSelectVotes] = useState<number[]>(initialSelectVotes);
  const socket = io(URLS.SOCKET);
  const router = useRouter();

  useEffect(() => {
    getCurrrenVotes();
    validateUser();
    listenForVotes();
  }, []);

  const getCurrrenVotes = () => {
    socket.emit("currentVotes", (votes: Vote[]) => {
      setVotes(votes);
    });
  };

  const validateUser = () => {
    if (userParam === "") {
      router.push("/");
      return;
    }
    const newUser: Vote = {
      user: userParam,
      vote,
      hash: hashParam,
    };
    socket.emit("newUser", newUser);
  };

  const listenForVotes = () => {
    socket.on("votes", (votes: Vote[]) => {
      console.log(votes);
      setVotes(votes);
    });
  };

  const sendAMessage = () => {
    const newVote: Vote = {
      user: userParam,
      vote,
      hash: hashParam,
    };
    socket.emit("vote", newVote);
  };

  const endSession = () => {
    localStorage.removeItem(APP.USER);
    socket.emit("removeUser", userParam);
    router.push("/");
  };

  const resetVotes = () => {
    socket.emit("resetVotes");
  };

  return (
    <>
      <button onClick={resetVotes}>Borrar</button>
      <br />
      <button onClick={endSession}>Cerrar sesión</button>
      <br />
      <br />
      <div className="flex flex-col gap-2">
        {votes.map((vote) => (
          <VoteCard vote={vote} />
        ))}
      </div>
      <div className="flex  gap-2 justify-center mt-3 flex-wrap">
        {selectVotes.map((value) => (
          <VoteSelect value={value,setVote} />
        ))}
      </div>
    </>
  );
}
