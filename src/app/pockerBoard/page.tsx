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
  const roomParam = searchParams.get("room") || "";
  const [votes, setVotes] = useState<Vote[]>([]);
  const [value, setValue] = useState<number>(0);
  const socket = io(URLS.SOCKET, {
    query: { room: roomParam },
  });
  const router = useRouter();
  const user = localStorage.getItem(APP.USER) || "";
  const URL =
    URLS.SERVER +
    useEffect(() => {
      sendNewVote();
    }, [value]);

  useEffect(() => {
    if (user === "") {
      router.push(URLS.SERVER + "/selectUser?room=" + roomParam);
      return;
    }
    socket.on("roomHistory", (votes) => {
      setVotes(votes);
    });

    const newVote: Vote = {
      user,
      value: 0,
    };
    socket.emit("newVote", newVote, roomParam);

    return () => {
      socket.off("votes");
    };
  }, []);

  const sendNewVote = () => {
    const newVote: Vote = {
      user,
      value: value,
    };
    socket.emit("newVote", newVote, roomParam);
  };

  return (
    <div className="fade-in">
      <div className="flex gap-2 flex-col pt-10 m-auto w-[90%] md:w-[60%] lg:w-[40%] text-lg font-bold ">
        {votes.map((vote) => (
          <VoteCard key={vote.user} vote={vote} />
        ))}
      </div>
      <div className="flex gap-2 justify-center pt-10 flex-wrap">
        {initialSelectVotes.map((item: number, i) => (
          <VoteSelect
            key={i}
            sendNewVote={sendNewVote}
            setValue={setValue}
            item={item}
            value={value}
          />
        ))}
      </div>
    </div>
  );
}
