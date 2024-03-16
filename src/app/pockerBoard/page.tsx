"use client";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CachedIcon from "@material-ui/icons/Cached";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Theme, Tooltip, withStyles } from "@material-ui/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Vote } from "../../../interfaces/vote";
import VoteCard from "../../components/VoteCard";
import { APP, URLS } from "../../../constants";
import VoteSelect from "@/components/VoteSelect";
import { ShowChart } from "@material-ui/icons";

export default function PockerBoard() {
  const initialSelectVotes = [1, 2, 3, 5, 8, 13, 21];
  const searchParams = useSearchParams();
  const roomParam = searchParams.get("room") || "";
  const [votes, setVotes] = useState<Vote[]>([]);
  const [value, setValue] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const socket = io(URLS.SOCKET, {
    query: { room: roomParam },
  });
  const router = useRouter();
  const user = window.localStorage.getItem(APP.USER) || "";
  const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "black",
      fontSize: 14,
    },
  }))(Tooltip);

  useEffect(() => {
    sendNewVote();
  }, [value]);

  useEffect(() => {
    initValidation();
    registerFirsVote();
    listenShow();
    return () => {
      socket.off("votes");
    };
  }, []);

  const listenShow = () => {
    socket.on("show", (show: boolean) => {
      setShow(show);
    });
  };
  const initValidation = () => {
    if (user === "") {
      router.push(URLS.SERVER + "selectUser?room=" + roomParam);
      return;
    }
    socket.on("roomHistory", (votes) => {
      setVotes(votes);
    });
  };

  const registerFirsVote = () => {
    const newVote: Vote = {
      user,
      value: 0,
    };
    socket.emit("newVote", newVote, roomParam);
  };

  const sendNewVote = () => {
    const newVote: Vote = {
      user,
      value: value,
    };
    socket.emit("newVote", newVote, roomParam);
  };

  const leaveRoom = () => {
    logOut();
    router.push(URLS.SERVER);
  };

  const changeUserName = () => {
    logOut();
    router.push(URLS.SERVER + "selectUser?room=" + roomParam);
  };

  const logOut = () => {
    socket.emit("logOut", user, roomParam);
    localStorage.removeItem(APP.USER);
  };

  const showVotes = () => {
    socket.emit("setShow", roomParam, !show);
  };

  return (
    <>
      <div className="fade-in">
        <div className="flex justify-between p-2">
          <div className="red">qpocker</div>
          <div onClick={leaveRoom}>
            <LightTooltip title="Salir de la sala" placement="left">
              <ExitToAppIcon className="cursor-pointer" />
            </LightTooltip>
          </div>
        </div>
        <div className="text-center pt-4 font-bold text-4xl">
          {user}
          <span onClick={changeUserName}>
            <LightTooltip title="cambiar nombre" placement="right">
              <CachedIcon
                fontSize="large"
                className="cursor-pointer pl-2 text-gray-400 hover:text-black "
              />
            </LightTooltip>
          </span>
        </div>
        <div className="flex gap-2 flex-col pt-5 m-auto w-[90%] md:w-[60%] lg:w-[40%] text-lg font-bold ">
          <div className="relative">
            <div
              onClick={showVotes}
              className=" absolute  right-2 -top-[28px] "
            >
              {show ? (
                <VisibilityOffIcon
                  className="text-gray-400 hover:text-black cursor-pointer fade-in"
                  fontSize={"large"}
                />
              ) : (
                <VisibilityIcon
                  className="text-gray-400 hover:text-black cursor-pointer fade-in"
                  fontSize={"large"}
                />
              )}
            </div>
          </div>
          {votes.map((vote) => (
            <VoteCard key={vote.user} vote={vote} show={show} />
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
      <div className="fixed bottom-0 left-2 fixed">
        <em> Planing - {new Date().toDateString()}</em>
      </div>
    </>
  );
}
