/* eslint-disable no-void */
import { ArrowUpIcon } from "@heroicons/react/outline";
import { useAddMessageMutation } from "src/api/firestore";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setEditingMessage } from "../slice";

export const MessageBox = () => {
  const { editingMessage, currDocKey, me } = useAppSelector(
    (state) => state.clipboard
  );
  const dispatch = useAppDispatch();
  const [trigger] = useAddMessageMutation();
  const hidden = me !== currDocKey && currDocKey !== "Collections";
  return (
    <div
      className={`bg-slate-100 left-0 w-screen px-4 md:static md:w-full py-2 ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="rounded-md w-full flex items-center bg-white shadow-sm focus:ring-blue-300 focus:ring-1">
        <input
          value={editingMessage}
          onChange={(e) => dispatch(setEditingMessage(e.target.value))}
          className="px-2 outline-0 bg-white rounded-lg h-10 grow focus:ring-blue-300 focus:ring-1 md:px-4"
          type="text"
          placeholder="Message..."
        />
        <div
          onClick={() => {
            dispatch(setEditingMessage(""));
            void trigger({
              publisher: currDocKey,
              kind: "text/plain",
              content: editingMessage,
              timestamp: Number(new Date()),
            });
          }}
        >
          <ArrowUpIcon className="h-6 w-6 mx-2 stroke-blue-400 " />
        </div>
      </div>
    </div>
  );
};
