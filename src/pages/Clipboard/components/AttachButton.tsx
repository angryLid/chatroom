import { uuidv4 } from "@firebase/util";
import { PaperClipIcon } from "@heroicons/react/outline";
import { useAddMessageMutation } from "src/api/firestore";
import { useUploadFileMutation } from "src/api/storage";

export const AttachButton = () => {
  const [upload] = useUploadFileMutation();
  const [sendMsg] = useAddMessageMutation();
  return (
    <>
      <PaperClipIcon className="h-6 w-6 mx-auto stroke-blue-400 col-start-1 col-end-2 row-start-1 row-end-2" />

      <input
        className="absolute top-0 left-0 opacity-0 h-6 w-6"
        type="file"
        accept="image/*"
        name="myImage"
        // ref={inputRef}
        onChange={(event) => {
          console.log(event);
          const file = event.currentTarget.files?.[0];
          if (file) {
            console.info(file);
            const id = uuidv4();
            upload({ id, file }).catch((e) => console.error(e));
            sendMsg({
              content: file.name,
              publisher: "Collections",
              kind: `blob#${id}`,
              timestamp: Number(new Date()),
            }).catch((e) => console.error(e));
          }
        }}
      />
    </>
  );
};
