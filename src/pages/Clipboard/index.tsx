/* eslint-disable no-void */
import { MenuIcon } from "@heroicons/react/outline";
import { useGetBrowsersQuery, useGetMessagesQuery } from "src/api/firestore";
import { Loading } from "src/components/Loading";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { BrowserListItem, MessageBox, MessageList } from "./components";
import { toggleDropDown } from "./slice";

export const Clipboard = () => {
  const dispatch = useAppDispatch();
  const { currDocKey, dropDown, browserDocument } = useAppSelector(
    (state) => state.clipboard
  );
  const {
    data: browsers,
    isSuccess,
    isLoading,
  } = useGetBrowsersQuery(browserDocument);

  const { data: messages, isLoading: isLoading2 } =
    useGetMessagesQuery(currDocKey);
  return (
    <div className="h-screen w-screen flex">
      {isLoading && isLoading2 && <Loading />}
      <div
        className={`md:w-1/4 md:p-2 lg:w-1/5 h-full md:block md:static absolute top-14 left-0 bg-white w-screen z-40 ${
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
      <div className="flex flex-col w-full md:w-3/4 lg:w-4/5 h-full">
        <div className="py-3 md:py-5 shadow-lg flex items-center text-lg px-4 font-light justify-center relative">
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
        <div className="bg-slate-100 grow overflow-x-scroll	px-4 py-2">
          {messages && <MessageList messages={messages} />}
        </div>
        <div>
          <MessageBox />
        </div>
      </div>
    </div>
  );
};
