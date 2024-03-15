import React from "react";
import { Vote } from "../../interfaces/vote";
interface Props {
  vote: Vote;
}
const VoteCard = ({ vote }: Props) => {
  return (
    <div className="vote-card">
      <div>{vote.user}</div>
      <div>{vote.value}</div>
    </div>
  );
};

export default VoteCard;
