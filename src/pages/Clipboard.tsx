/* eslint-disable no-void */
import { ArrowUpIcon } from "@heroicons/react/outline";
import { v4 as uuid } from "@lukeed/uuid";
import { useEffect, useState } from "react";
import parser from "ua-parser-js";
import { fetchDevices, registerDevice } from "../api";
import { DesktopComputer } from "../assets/DesktopComputer";
import { Menu } from "../assets/Menu";
import { useLocalStorage } from "../shared";
import { useAddMutation } from "../store";
interface IDeviceView {
  uuid: string;
  os: string;
  browser: string;
  myself: boolean;
  kind: "desktop" | "mobile" | "aggravation";
}

interface IDeviceModel {
  uuid: string;
  userAgent: string;
}
const mapper = (d: IDeviceModel, isMyself = false) => {
  const result = parser(d.userAgent);
  const r: IDeviceView = {
    uuid: d.uuid,
    myself: isMyself,
    os: `${result.os.name || "unknown os"} ${result.os.version || ""}`,
    browser: `${result.browser.name || "unknown browser"} ${
      result.browser.version || ""
    }`,
    kind: "desktop",
  };
  return r;
};
export const Clipboard = () => {
  const [list, setList] = useState<IDeviceView[]>([]);
  const [chosen, setChosen] = useState<IDeviceView>();
  const [myself, setMyself] = useState<IDeviceView>();

  const [drawerIsShow, setDrawerIsShow] = useState(false);
  const [input, setInput] = useState("");
  useEffect(() => {
    let ua: IDeviceModel = {
      uuid: uuid(),
      userAgent: navigator.userAgent,
    };
    const uaStr = localStorage.getItem("userAgent");
    if (uaStr) {
      ua = JSON.parse(uaStr) as IDeviceModel;
    } else {
      localStorage.setItem("userAgent", JSON.stringify(ua));
      registerDevice(ua.uuid, ua.userAgent).catch((e) => console.error(e));
    }
  }, []);
  useEffect(() => {
    const ua = JSON.parse(
      localStorage.getItem("userAgent") || "{}"
    ) as IDeviceModel;
    fetchDevices()
      .then((snapshot) => {
        return snapshot.val() as { [key: string]: string };
      })
      .then((devices) => {
        console.info(devices);
        const list: IDeviceView[] = [
          {
            uuid: uuid(),
            os: "Aggravation",
            browser: "",
            myself: false,
            kind: "aggravation",
          },
        ];
        for (const [uuid, uaStr] of Object.entries(devices)) {
          list.push(
            mapper(
              {
                uuid: uuid,
                userAgent: uaStr,
              },
              ua.uuid === uaStr
            )
          );
        }
        setList(list);
        setChosen(list[0]);
      })
      .catch((e) => console.error(e));
  }, []);

  const [UA, setUA] = useLocalStorage("userAgent", uuid());
  const [add, result] = useAddMutation();
  const send = () => {
    void add();
    const message = {
      publisher: UA,
      kind: "text/plain",
      content: input,
    };
  };
  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/4 p-2 h-full hidden md:block">
        {list.map((v, i) => (
          <div key={i} onClick={() => setChosen(v)}>
            <Device val={v} selected={v.uuid === chosen?.uuid} />
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full md:w-3/4 h-full">
        <div className="h-16 shadow-lg flex items-center text-lg px-4 font-light justify-center relative">
          <div
            onClick={() => {
              setDrawerIsShow((v) => !v);
            }}
          >
            <Menu />
          </div>
          <div className="grow px-4 overflow-x-hidden whitespace-nowrap">
            {chosen?.os} {chosen?.browser}
          </div>
          <div
            className={`${
              drawerIsShow ? "block" : "hidden"
            } absolute left-0 top-16 w-screen ease-in-out duration-300`}
          >
            {list.map((v, i) => (
              <div
                key={i}
                onClick={() => {
                  setChosen(v);
                  setDrawerIsShow(false);
                }}
              >
                <DeviceMobi val={v} selected={v.uuid === chosen?.uuid} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-100 grow">
          <div>{myself?.os}</div>
          <div className="fixed bottom-2 left-0  shadow-sm w-screen px-4 ">
            <div className="rounded-md w-full flex items-center bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                className="px-2 outline-0 bg-white rounded-lg h-10 grow"
                type="text"
                placeholder="Message..."
              />
              <div onClick={() => send()}>
                <ArrowUpIcon className="h-6 w-6 mx-2 stroke-blue-400 " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeviceMobi = ({
  val,
  selected,
}: {
  val: IDeviceView;
  selected: boolean;
}) => {
  return (
    <div
      className={`${
        selected ? "bg-blue-400" : "hover:bg-slate-200"
      } h-14 cursor-pointer flex items-center p-2`}
    >
      {selected ? (
        <DesktopComputer stroke="stroke-slate-50" />
      ) : (
        <DesktopComputer stroke="stroke-slate-700" />
      )}

      <div className={`${selected ? "text-white" : "text-black"} p-2`}>
        <div>{val?.os}</div>
        <div className="text-xs">{val?.browser}</div>
      </div>
    </div>
  );
};
const Device = ({ val, selected }: { val: IDeviceView; selected: boolean }) => {
  return (
    <div
      className={`${
        selected ? "bg-blue-400" : "hover:bg-slate-200"
      } h-20 rounded-xl cursor-pointer flex items-center p-2`}
    >
      {selected ? (
        <DesktopComputer stroke="stroke-slate-50" />
      ) : (
        <DesktopComputer stroke="stroke-slate-700" />
      )}

      <div className={`${selected ? "text-white" : "text-black"} p-2`}>
        <div>{val?.os}</div>
        <div className="text-xs">{val?.browser}</div>
      </div>
    </div>
  );
};
