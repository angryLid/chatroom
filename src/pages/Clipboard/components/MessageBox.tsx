/* eslint-disable no-void */
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { KeyboardEventHandler } from "react";
import { useAddMessageMutation } from "src/api/firestore";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setEditingMessage } from "../slice";
import { AttachButton } from "./AttachButton";

export const MessageBox = () => {
  const { editingMessage, currDocKey, me } = useAppSelector(
    (state) => state.clipboard
  );
  const dispatch = useAppDispatch();
  const [trigger] = useAddMessageMutation();
  const hidden = me !== currDocKey && currDocKey !== "Collections";

  const send = () => {
    dispatch(setEditingMessage(""));
    void trigger({
      publisher: currDocKey,
      kind: "text/plain",
      content: editingMessage,
      timestamp: Number(new Date()),
    });
  };
  const handleKeyDown: KeyboardEventHandler = (event) => {
    console.log("User pressed: ", event.key);

    // console.log(message);

    if (event.key === "Enter" && editingMessage.trim() !== "") {
      // 👇️ your logic here

      send();
    }
  };
  return (
    <div
      className={`bg-slate-100 left-0 w-screen px-4 md:static md:w-full py-2 ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="relative  rounded-md w-full grid-cols-12 grid-rows-1 items-center bg-white shadow-sm focus:ring-blue-300 focus:ring-1">
        <input
          value={editingMessage}
          onChange={(e) => dispatch(setEditingMessage(e.target.value))}
          className="col-start-1 col-end-13 row-start-1 row-end-2 pl-4 outline-0 bg-white rounded-lg h-10 grow focus:ring-blue-300 focus:ring-1 md:pl-4 pr-14 w-full"
          type="text"
          placeholder="Message..."
          onKeyDown={handleKeyDown}
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 text-center">
          {editingMessage === "" ? (
            <AttachButton />
          ) : (
            <div onClick={send}>
              <PaperAirplaneIcon className="h-6 w-6 mx-auto stroke-blue-400 fill-blue-400 rotate-90" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
