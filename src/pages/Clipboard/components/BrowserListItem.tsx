import {
  DesktopComputerIcon,
  DeviceMobileIcon,
} from "@heroicons/react/outline";

import { BrowserDocument } from "src/shared/types";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setCurrent } from "../slice";

interface Props {
  doc: BrowserDocument;
}
export const BrowserListItem = ({ doc }: Props) => {
  const dispatch = useAppDispatch();
  const { me, currDocKey } = useAppSelector((state) => state.clipboard);
  const { docKey } = doc;
  const onClick = () => dispatch(setCurrent(docKey));
  const isDesktop =
    docKey.includes("Mac") ||
    docKey.includes("Win") ||
    docKey.includes("Linux");
  const selected = docKey === currDocKey;
  const className = `h-8 w-8 ${
    selected ? "stroke-slate-50" : "stroke-slate-700"
  }`;
  return (
    <div
      className={`${
        selected ? "bg-blue-400" : "hover:bg-slate-200"
      } h-14 md:h-20 md:rounded-xl cursor-pointer flex items-center p-2`}
      onClick={onClick}
    >
      {isDesktop ? (
        <DesktopComputerIcon className={className} />
      ) : (
        <DeviceMobileIcon className={className} />
      )}
      <div className={`${selected ? "text-white" : "text-black"} p-2 grow`}>
        <div>
          {doc.osName} {doc.osVersion}
        </div>
        <div className="text-xs">
          {doc.browserName} {doc.browserVersion}
        </div>
      </div>
      {docKey === me && (
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold  px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          Me
        </span>
      )}
    </div>
  );
};
