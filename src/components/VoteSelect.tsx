import React from "react";
interface Props {
  value: number;
  setVote: Function;
}
const VoteSelect = ({ value, setVote }: Props) => {
  return <div className="vote-select-container">{value}</div>;
};

export default VoteSelect;
