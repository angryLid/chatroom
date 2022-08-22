/* eslint-disable no-void */
import {
  ArrowUpIcon,
  DesktopComputerIcon,
  GlobeIcon,
  DeviceMobileIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { v4 as uuid } from "@lukeed/uuid";
import { useEffect, useState } from "react";
import parser from "ua-parser-js";
import { fetchDevices, registerDevice } from "../api";
import { DesktopComputer } from "../assets/DesktopComputer";
import { Menu } from "../assets/Menu";
import { useLocalStorage } from "../shared";
import { IMessage, useAddMutation, useGetListQuery } from "../store";
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
  const kind = result.os.name === "Android" ? "mobile" : "desktop";
  const r: IDeviceView = {
    uuid: d.uuid,
    myself: isMyself,
    os: `${result.os.name || "unknown os"} ${result.os.version || ""}`,
    browser: `${result.browser.name || "unknown browser"} ${
      result.browser.version || ""
    }`,
    kind,
  };
  return r;
};
export const Clipboard = () => {
  const [list, setList] = useState<IDeviceView[]>([]);
  const [chosen, setChosen] = useState<IDeviceView>();

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
        const list: IDeviceView[] = [
          {
            uuid: uuid(),
            os: "Aggravation",
            browser: "from all devices",
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
              ua.uuid === uuid
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
  const { data: mList } = useGetListQuery();
  const send = async () => {
    const message: IMessage = {
      publisher: UA,
      kind: "text/plain",
      content: input,
      timestamp: Number(new Date()),
    };
    await add(message);
  };
  const [messages, setMessages] = useState<IMessage[]>([]);
  useEffect(() => {
    if (!mList) {
      return;
    }
    setMessages(mList);
  });
  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/4 lg:w-1/5 p-2 h-full hidden md:block">
        {list.map((v, i) => (
          <div key={i} onClick={() => setChosen(v)}>
            <Device val={v} selected={v.uuid === chosen?.uuid} />
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full md:w-3/4 h-full grow">
        <div className="h-16 shadow-lg flex items-center text-lg px-4 font-light justify-center relative">
          <div
            className="md:hidden"
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
        <div className="bg-slate-100 grow md:flex md:flex-col md:justify-end">
          <div className="bg-red-100 grow py-4 px-4">
            {messages?.map((m, i) => (
              <div key={i} className="bg-white flex my-2 ">
                <div className="bg-cyan-100 h-10 w-10 p-2 rounded-full">
                  <UserIcon className="h-6 w-6 stroke-zinc-700" />
                </div>
                <div className="bg-purple-100 px-2 py-1 rounded-md relative">
                  <div className="absolute w-0 h-0 border-8 border-t-transparent border-b-transparent border-l-transparent top-1/2 border-purple-100 -left-4 -translate-y-1/2" />
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="fixed bottom-2 left-0   w-screen px-4 md:static md:w-full md:mb-2">
            <div className="rounded-md w-full flex items-center bg-white shadow-sm focus:ring-blue-300 focus:ring-1">
              <input
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                className="px-2 outline-0 bg-white rounded-lg h-10 grow focus:ring-blue-300 focus:ring-1 md:px-4"
                type="text"
                placeholder="Message..."
              />
              <div
                onClick={() => {
                  send().catch((e) => console.error(e));
                }}
              >
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
      {selected && val.kind === "desktop" && (
        <DesktopComputerIcon className="h-8 w-8 stroke-slate-50" />
      )}
      {!selected && val.kind === "desktop" && (
        <DesktopComputerIcon className="h-8 w-8 stroke-slate-700" />
      )}
      {selected && val.kind === "aggravation" && (
        <GlobeIcon className="h-8 w-8 stroke-slate-50" />
      )}
      {!selected && val.kind === "aggravation" && (
        <GlobeIcon className="h-8 w-8 stroke-slate-700" />
      )}
      {selected && val.kind === "mobile" && (
        <DeviceMobileIcon className="h-8 w-8 stroke-slate-50" />
      )}
      {!selected && val.kind === "mobile" && (
        <DeviceMobileIcon className="h-8 w-8 stroke-slate-700" />
      )}
      <div className={`${selected ? "text-white" : "text-black"} p-2 grow`}>
        <div>{val?.os}</div>
        <div className="text-xs">{val?.browser}</div>
      </div>
      {val.myself && (
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold  px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          Current
        </span>
      )}
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
      {selected && val.kind === "desktop" && (
        <DesktopComputerIcon className="h-8 w-8 stroke-slate-50" />
      )}
      {!selected && val.kind === "desktop" && (
        <DesktopComputerIcon className="h-8 w-8 stroke-slate-700" />
      )}
      {selected && val.kind === "aggravation" && (
        <GlobeIcon className="h-8 w-8 stroke-slate-50" />
      )}
      {!selected && val.kind === "aggravation" && (
        <GlobeIcon className="h-8 w-8 stroke-slate-700" />
      )}
      {selected && val.kind === "mobile" && (
        <DeviceMobileIcon className="h-8 w-8 stroke-slate-50" />
      )}
      {!selected && val.kind === "mobile" && (
        <DeviceMobileIcon className="h-8 w-8 stroke-slate-700" />
      )}

      <div className={`${selected ? "text-white" : "text-black"} p-2 grow`}>
        <div>{val?.os}</div>
        <div className="text-xs">{val?.browser}</div>
      </div>
      {val.myself && (
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold  px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          Current
        </span>
      )}
    </div>
  );
};
