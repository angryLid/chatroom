import { UserIcon } from "@heroicons/react/outline";
import { useLazyDownloadFileQuery } from "src/api/storage";
import { AsyncImage } from "src/components/AsyncImage";
import { IMessage } from "src/shared";

export const MessageItem = ({ content, kind }: IMessage) => {
  const [download, { data, isSuccess }] = useLazyDownloadFileQuery();

  return (
    <>
      <div className="bg-gray-300 h-10 w-10 p-2 rounded-full">
        <UserIcon className="h-6 w-6 stroke-zinc-700" />
      </div>
      <div className="bg-green-200 px-2 py-1 rounded-md relative overflow-x-clip break-words">
        <div className="absolute w-0 h-0 border-8 border-t-transparent border-b-transparent border-l-transparent top-1/2 border-green-200 -left-4 -translate-y-1/2" />
        {content}
        {kind?.startsWith("blob") && (
          <span
            onClick={() => {
              download(kind?.split("#")[1] ?? "").catch((e) =>
                console.error(e)
              );
            }}
          >
            download
          </span>
        )}
        {isSuccess && <AsyncImage src={data} toast={() => null} />}
      </div>
    </>
  );
};
