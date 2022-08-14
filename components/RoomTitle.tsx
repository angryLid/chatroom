import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { getLS } from "../lib/hooks";
import cog from "../public/assets/cog.svg";
import { Dialog } from "./Dialog";

export const RoomTitle = () => {
  const [dialog, setDialog] = useState(false);
  const { data: room } = useSWR("room", getLS);
  return (
    <div>
      <h1 className="h-10 leading-10 bg-slate-500 text-white text-center font-light text-lg w-screen flex fixed top-0 left-0 items-center">
        <span className="w-2/12 "> </span>
        <span className="w-8/12">Room {room ? room : "0"}</span>
        <span className="w-2/12 h-4/6" onClick={() => setDialog(true)}>
          <Image
            className="h-full w-full stroke-white"
            src={cog as string}
            alt="settings"
          />
        </span>
      </h1>
      <Dialog visible={dialog} close={() => setDialog(false)} />
    </div>
  );
};
