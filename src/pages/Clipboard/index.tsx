/* eslint-disable no-void */
import { MenuIcon } from "@heroicons/react/outline";
import { useGetBrowsersQuery } from "src/api/firestore";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { BrowserListItem, MessageBox, MessageList } from "./components";
import { toggleDropDown } from "./slice";

export const Clipboard = () => {
  const dispatch = useAppDispatch();
  const { currDocKey, dropDown, browserDocument } = useAppSelector(
    (state) => state.clipboard
  );
  const { data: browsers, isSuccess } = useGetBrowsersQuery(browserDocument);

  return (
    <div className="h-screen w-screen flex">
      <div
        className={`md:w-1/4 lg:w-1/5 md:p-2 h-full md:block md:static absolute top-16 left-0 bg-white w-screen z-50 ${
          dropDown ? "block" : "hidden"
        }`}
      >
        {isSuccess &&
          browsers.map((v, i) => (
            <div key={i}>
              <BrowserListItem doc={v} />
            </div>
          ))}
      </div>
      <div className="flex flex-col w-full md:w-3/4 h-full grow">
        <div className="h-16 shadow-lg flex items-center text-lg px-4 font-light justify-center relative">
          <div
            className="block md:hidden"
            onClick={() => {
              dispatch(toggleDropDown());
            }}
          >
            <MenuIcon className="h-8 w-8 stroke-slate-600" />
          </div>
          <div className="grow px-4 overflow-x-hidden whitespace-nowrap">
            {currDocKey}
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
