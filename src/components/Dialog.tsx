import { useEffect, useState } from "react";
import useSWR from "swr";
import { getLS } from "../hooks";
import { Modal } from "./Modal";

interface IProps {
  visible: boolean;
  close: () => void;
}

export const Dialog = ({ close, visible }: IProps) => {
  const { data: room, mutate: setRoom } = useSWR("room", getLS);
  const { data: user, mutate: setUser } = useSWR("user", getLS);

  const [userLocal, setUserLocal] = useState(user || "");
  const [roomLocal, setRoomLocal] = useState(room || "");

  const [tip, setTip] = useState("");

  useEffect(() => {
    console.info("dialog effect");
  });
  const save = (u: string, r: string) => {
    const pattern = /^\d{1,4}$/;
    if (!(u.length >= 2 && u.length <= 6)) {
      setTip("nickname too long or too short.");
      return;
    }
    if (!pattern.test(r)) {
      setTip("wrong room id.");
      return;
    }
    setTip("");
    localStorage.setItem("user", u);
    localStorage.setItem("room", r);
    setRoom().catch((e) => console.warn(e));
    setUser().catch((e) => console.warn(e));
    close();
  };
  return (
    <Modal visible={visible}>
      <div className="border-none shadow-lg w-11/12 pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <h5 className=" border-gray-200 rounded-t-md p-3 text-center border-b text-xl font-medium leading-normal text-gray-800">
          Settings
        </h5>

        <div className="h-24 m-4 grid grid-cols-6 grid-rows-2">
          <label className="text-black row-start-1 row-end-2 col-start-1 col-end-3 text-right  leading-full h-full  my-auto inline-flex items-center justify-end mx-2">
            Nickname:
          </label>
          <input
            className="row-start-1 row-end-2 col-start-3 col-end-7 border-b border-gray-800 text-black focus:outline-none px-2"
            type="text"
            value={userLocal}
            placeholder="2 ~ 6 characters"
            onChange={(e) => setUserLocal(e.currentTarget.value)}
          />
          <label className="text-black row-start-2 row-end-3 col-start-1 col-end-3 text-right h-full leading-full inline-flex items-center justify-end mx-2">
            Room:
          </label>
          <input
            className="row-start-2 text-black row-end-3 col-start-3 col-end-7 border-b border-gray-800 focus:outline-none px-2"
            type="text"
            value={roomLocal}
            placeholder="0 ~ 9999"
            onChange={(e) => setRoomLocal(e.currentTarget.value)}
          />
        </div>
        <div className="mx-2 my-1 text-red-500 text-sm">{tip}</div>
        <div className="flex justify-evenly flex-shrink-0 flex-wrap items-center  p-4 border-t border-gray-200 rounded-b-md">
          <button
            type="button"
            className="text-black w-2/6 px-6 py-2.5 bg-white font-medium text-xs leading-tight rounded shadow-lg  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-white-800 active:shadow-lg transition duration-150 ease-in-out border"
            data-bs-dismiss="modal"
            onClick={close}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-2/6 px-6 py-2.5 bg-cyan-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-cyan-600 hover:shadow-lg focus:bg-cyan-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-600 active:shadow-lg transition duration-150 ease-in-out ml-1"
            onClick={() => save(userLocal || "", roomLocal || "")}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};
