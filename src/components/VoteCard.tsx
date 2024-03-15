import React from "react";
import { Vote } from "../../interfaces/vote";
interface Props {
  vote: Vote;
}
const VoteCard = ({ vote }: Props) => {
  return (
    <div className="border-2 border-black flex justify-between rounded px-5  py-4">
      <div>{vote.user}</div>
      <div>{vote.value === 0 ? "---" : vote.value}</div>
    </div>
  );
};

export default VoteCard;
