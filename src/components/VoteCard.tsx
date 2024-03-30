"user client";
import React, { useEffect, useState } from "react";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

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
        vote.value !== 0 ? "bg-white dark:bg-slate-700" : ""
      } border-2 border-black dark:border-slate-300 flex justify-between rounded px-4  py-1 fade-in`}
    >
      <div className="dark:text-slate-300">{vote.user}</div>
      <div className=" fade-in dark:text-slate-300">
        {!show && vote.value === 0 ? <NotInterestedIcon className="" /> : ""}
        {!show && vote.value !== 0 ? <CheckCircleIcon className="" /> : ""}
        {!show ? (
          ""
        ) : vote.value === 0 ? (
          "---"
        ) : vote.value === -1 ? (
          <LocalCafeIcon />
        ) : vote.value === -2 ? (
          "?"
        ) : vote.value === 100 ? (
          <AllInclusiveIcon />
        ) : (
          vote.value
        )}
      </div>
    </div>
  );
};

export default VoteCard;
