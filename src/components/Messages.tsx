import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { db } from "../api";
import { getLS } from "../hooks";
import type { IMsgList } from "../shared";
import { Message } from "./Message";

export const Messages = () => {
  const { data: room } = useSWR("room", getLS);
  const [msgList, setMsgList] = useState<IMsgList>({});

  useEffect(() => {
    if (!room) return;
    const unSubscribe = onValue(
      ref(db, `${room.padStart(4, "0")}/`),
      (snapshot) => {
        const data = snapshot.val() as IMsgList;
        setMsgList(data);
      }
    );
    return unSubscribe;
  }, [room]);

  return (
    <div className="mb-20 mt-10">
      {msgList &&
        Object.keys(msgList).map((key, index) => (
          <div className="my-1" key={index}>
            <Message timestamp={key} message={msgList[key]} />
          </div>
        ))}
    </div>
  );
};
