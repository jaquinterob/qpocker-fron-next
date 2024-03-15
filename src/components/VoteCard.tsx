import React, { useEffect, useState } from "react";
import { Vote } from "../../interfaces/vote";
import { setInterval } from "timers";
interface Props {
  vote: Vote;
}
const VoteCard = ({ vote }: Props) => {
  const [blink, setBlink] = useState<boolean>(false);

  useEffect(() => {
    setBlink(true);
  }, [vote.value]);

  useEffect(() => {
    let timeOut!: NodeJS.Timeout;
    if (blink) {
      timeOut = setTimeout(() => {
        setBlink(false);
      }, 1000);
    } else {
      clearTimeout(timeOut);
    }
    return () => clearTimeout(timeOut);
  }, [blink]);

  return (
    <div
      className={`${
        blink ? "blink-once " : ""
      } border-2 border-black flex justify-between rounded px-5  py-4 `}
    >
      <div>{vote.user}</div>
      <div>{vote.value === 0 ? "---" : vote.value}</div>
    </div>
  );
};

export default VoteCard;
