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
  const userParam = searchParams.get("user") || "";
  const [votes, setVotes] = useState<Vote[]>([]);
  const [value, setValue] = useState<number>(0);
  const socket = io(URLS.SOCKET, {
    query: { room: roomParam },
  });

  useEffect(() => {
    socket.on("votes", (vote) => {
      setVotes((prevVotes) => [...prevVotes, vote]);
    });
    socket.on("roomHistory", (votes) => {
      setVotes(votes);
    });

    const newVote: Vote = {
      user: userParam,
      value: 0,
    };
    socket.emit("newVote", newVote, roomParam);
    return () => {
      socket.off("votes");
    };
  }, []);

  const sendNewVote = () => {
    const newVote: Vote = {
      user: userParam,
      value: value,
    };
    socket.emit("newVote", newVote, roomParam);
  };
  return (
    <>
      <label htmlFor="value">Ingrese Valor: </label>
      <input
        type="number"
        name="value"
        id="value"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <br />
      <br />
      <button onClick={sendNewVote}>Guardar</button>
      <br />
      <br />
      {value}
      <br />
      <pre>{JSON.stringify(votes, null, 2)}</pre>
    </>
  );
}
