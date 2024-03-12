"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Vote } from "../../../interfaces/vote";
import VoteCard from "../../components/VoteCard";
import { URLS } from "../../../constants";

export default function Home() {
  const searchParams = useSearchParams();
  const userParam = searchParams.get("user") || "";
  const hashParam = searchParams.get("hash") || "";
  const [votes, setVotes] = useState<Vote[]>([]);
  const [vote, setVote] = useState<number | string>("");
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
    console.log(newVote);
    socket.emit("vote", newVote);
  };

  const resetVotes = () => {
    socket.emit("resetVotes");
  };
  return (
    <>
      <button onClick={sendAMessage}>Send hi</button>
      <br />
      <br />
      <button onClick={resetVotes}>resetVotes</button>
      <br />
      <br />
      <div className="p-3">
        <input
          type="number"
          value={vote as number}
          onChange={(e) => setVote(Number(e.target.value))}
        />
      </div>
      <br />
      <div className="flex flex-col gap-2">
        {votes.map((vote) => (
          <VoteCard key={vote.hash} vote={vote} />
        ))}
      </div>
    </>
  );
}
