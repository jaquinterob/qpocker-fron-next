"use client";

import React, { useEffect, useState } from "react";

import { Room } from "@/interfaces/room";
import { RoomService } from "@/services/room.service";
const Page = () => {
  const roomService = new RoomService();
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    roomService.getAllRooms().then((response: Room[]) => {
      setRooms(response);
    });
  }, []);
  return (
    <div className="flex flex-wrap gap-2 p-4 justify-center">
      {rooms.map((room) => (
        <div className="border-2 border-black dark:border-slate-300  dark:text-slate-300 p-3 rounded">
          <pre>{JSON.stringify(room, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default Page;
