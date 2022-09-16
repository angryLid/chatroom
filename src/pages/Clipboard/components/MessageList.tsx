import { UserIcon } from "@heroicons/react/outline";
import { useEffect, useRef } from "react";
import { useGetMessagesQuery } from "src/api/firestore";
import { useAppSelector } from "src/store/hooks";

export const MessageList = () => {
  const el = useRef<HTMLDivElement>(null);
  const { currDocKey } = useAppSelector((state) => state.clipboard);
  const { data: messages } = useGetMessagesQuery(currDocKey);

  useEffect(() => {
    console.info("messages update");
    el.current?.scrollTo({ top: el.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-slate-100 grow overflow-x-scroll	px-4 py-2" ref={el}>
      {messages?.map((m, i) => (
        <div key={i} className="flex my-2 gap-3">
          <div className="bg-gray-300 h-10 w-10 p-2 rounded-full">
            <UserIcon className="h-6 w-6 stroke-zinc-700" />
          </div>
          <div className="bg-green-200 px-2 py-1 rounded-md relative">
            <div className="absolute w-0 h-0 border-8 border-t-transparent border-b-transparent border-l-transparent top-1/2 border-green-200 -left-4 -translate-y-1/2" />
            {m.content}
          </div>
        </div>
      ))}
    </div>
  );
};
