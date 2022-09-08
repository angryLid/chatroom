/* eslint-disable no-void */
import {
  DesktopComputerIcon,
  GlobeIcon,
  DeviceMobileIcon,
} from "@heroicons/react/outline";
import { v4 as uuid } from "@lukeed/uuid";
import { useEffect, useState } from "react";
import { useGetBrowsersQuery } from "src/api/firestore";
import parser from "ua-parser-js";
const r = parser(navigator.userAgent);

import { Menu } from "../../assets/Menu";

import { MessageBox } from "./components/MessageBox";
import { MessageList } from "./components/MessageList";
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

export const Clipboard = () => {
  const [list, setList] = useState<IDeviceView[]>([]);
  const [chosen, setChosen] = useState<IDeviceView>();

  const [drawerIsShow, setDrawerIsShow] = useState(false);
  const { data: browsers, isSuccess } = useGetBrowsersQuery(
    `${r.os.name ?? "Unknown"} ${r.browser.name ?? "Unknown"}`
  );
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
      // registerDevice(ua.uuid, ua.userAgent).catch((e) => console.error(e));
    }
  }, []);

  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/4 lg:w-1/5 p-2 h-full hidden md:block">
        {isSuccess &&
          browsers.map((v, i) => (
            <div key={i}>
              <Device
                val={{
                  browser: v,
                  os: v,
                  uuid: "",
                  myself: false,
                  kind: "desktop",
                }}
                selected={chosen?.uuid === ""}
              />
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
          <MessageList />
          <MessageBox />
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
