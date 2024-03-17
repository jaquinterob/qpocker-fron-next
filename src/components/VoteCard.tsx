import React, { useEffect, useState } from "react";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import CheckIcon from "@material-ui/icons/Check";
import { Vote } from "../../interfaces/vote";
interface Props {
  vote: Vote;
  show: boolean;
}
const VoteCard = ({ vote, show = true }: Props) => {
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
      className={` ${
        vote.value !== 0 ? "bg-white" : ""
      } border-2 border-black flex justify-between rounded px-5  py-4 fade-in`}
    >
      <div>{vote.user}</div>
      <div className="pb-1 fade-in">
        {!show && vote.value === 0 ? <NotInterestedIcon /> : ""}
        {!show && vote.value !== 0 ? <CheckCircleIcon /> : ""}
        {!show ? "" : vote.value === 0 ? "---" : vote.value}
      </div>
    </div>
  );
};

export default VoteCard;
