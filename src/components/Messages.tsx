import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { roomPipe } from "../api";
import { db } from "../api/database";
import { getLS } from "../hooks";
import type { IMsgList } from "../shared";
import { Message } from "./Message";

export const Messages = () => {
  const { data: room } = useSWR("room", getLS);
  const [msgList, setMsgList] = useState<IMsgList>({});

  useEffect(() => {
    const unSubscribe = onValue(ref(db, `${roomPipe(room)}/`), (snapshot) => {
      const data = snapshot.val() as IMsgList;
      setMsgList(data);
    });
    return unSubscribe;
  }, [room]);

  return (
    <div className="mb-18 mt-10">
      {msgList &&
        Object.keys(msgList).map((key, index) => (
          <div className="my-1" key={index}>
            <Message timestamp={key} message={msgList[key]} />
          </div>
        ))}
    </div>
  );
};
