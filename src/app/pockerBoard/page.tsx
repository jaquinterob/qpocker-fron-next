"use client";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CachedIcon from "@material-ui/icons/Cached";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import { Theme, Tooltip, withStyles } from "@material-ui/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Vote } from "../../../interfaces/vote";
import VoteCard from "../../components/VoteCard";
import { APP, URLS } from "../../../constants";
import VoteSelect from "@/components/VoteSelect";
import { Item } from "../../../interfaces/item";
import { log } from "console";

export default function PockerBoard() {
  const initialSelectVotes: Item[] = [
    { value: -2, selected: false },
    { value: -1, selected: false },
    { value: 1, selected: false },
    { value: 2, selected: false },
    { value: 3, selected: false },
    { value: 5, selected: false },
    { value: 8, selected: false },
    { value: 13, selected: false },
    { value: 20, selected: false },
    { value: 40, selected: false },
    { value: 100, selected: false },
  ];
  const [selectVotes, setSelectVotes] = useState<Item[]>(initialSelectVotes);
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

  const handleSelect = (item: Item) => {
    const indexItem = selectVotes.findIndex((i) => i.value === item.value);
    const copyOfSelectVotes = [...selectVotes];
    copyOfSelectVotes.forEach((i) => (i.selected = false));
    copyOfSelectVotes[indexItem].selected = true;
    setSelectVotes(copyOfSelectVotes);
  };

  useEffect(() => {
    sendNewVote();
  }, [value]);

  useEffect(() => {
    initValidation();
    registerFirsVote();
    listenShow();
    listenValue();
    return () => {
      socket.emit("logOut", user, roomParam);
      socket.off("votes");
    };
  }, []);

  const listenValue = () => {
    socket.on("value", () => {
      setValue(0);
      unselectSelections();
    });
  };

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

  const resetVotes = () => {
    socket.emit("resetValue", roomParam);
    socket.emit("resetVotes", roomParam);
    socket.emit("setShow", roomParam, false);
  };

  const unselectSelections = () => {
    const copyOfSelectVotes = [...selectVotes];
    copyOfSelectVotes.forEach((i) => (i.selected = false));
    setSelectVotes(copyOfSelectVotes);
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
        <div className="text-center py-4 font-bold text-4xl">
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
            <div className=" absolute  -right-[1px] -top-[18px] text-right w-fit font-normal text-sm text-gray-400 hover:text-black hover:underline cursor-pointer transition ">
              {show ? (
                <div
                  onClick={showVotes}
                  className="text-right w-full font-normal text-sm text-gray-400 hover:text-black hover:underline cursor-pointer transition"
                >
                  Ocultar
                  <VisibilityOffIcon className="ml-1" />
                </div>
              ) : (
                <div
                  onClick={showVotes}
                  className="text-right w-full font-normal text-sm text-gray-400 hover:text-black hover:underline cursor-pointer transition"
                >
                  Mostrar
                  <VisibilityIcon className="ml-1" />
                </div>
              )}
            </div>
            <div
              onClick={showVotes}
              className=" absolute  right-12 -top-[28px] "
            ></div>
          </div>
          {votes.map((vote) => (
            <VoteCard key={vote.user} vote={vote} show={show} />
          ))}

          <div
            onClick={resetVotes}
            className="text-right w-full font-normal text-sm text-gray-400 hover:text-black hover:underline cursor-pointer transition"
          >
            Borrar Votos <DeleteSweepIcon />
          </div>
        </div>
        <div className="flex gap-2 justify-center pt-10 flex-wrap  w-[90%] md:w-[60%] lg:w-[40%] m-auto">
          {selectVotes.map((item, i) => (
            <VoteSelect
              key={i}
              setValue={setValue}
              item={item}
              setSelectVotes={setSelectVotes}
              selectVotes={selectVotes}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </>
  );
}
