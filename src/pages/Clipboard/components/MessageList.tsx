import { useEffect, useRef } from "react";
import { useGetMessagesQuery } from "src/api/firestore";
import { useAppSelector } from "src/store/hooks";
import { MessageItem } from "./MessageItem";

export const MessageList = () => {
  const el = useRef<HTMLDivElement>(null);
  const { currDocKey } = useAppSelector((state) => state.clipboard);
  const { data: messages } = useGetMessagesQuery(currDocKey);

  useEffect(() => {
    console.info("messages update");
    el.current?.scrollTo({ top: el.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="bg-slate-100 grow overflow-y-auto overflow-x-hidden	px-4 py-2"
      ref={el}
    >
      {messages?.map((msg, i) => (
        <div key={i} className="flex my-2 gap-3 overflow-x-clip">
          <MessageItem {...msg} />
        </div>
      ))}
    </div>
  );
};
