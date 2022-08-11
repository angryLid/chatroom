import { useRef, useState } from "react";
import useSWR from "swr";
import { sendMessage } from "../api";
import { uploadToBucket } from "../api/database";
import photogragh from "../assets/photogragh.svg";
import x from "../assets/x.svg";
import { getLS } from "../hooks";
import { Modal } from "./Modal";

export const InputPanel = () => {
  const [isSending, setIsSending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const { data: nickname } = useSWR("user", getLS);
  const inputRef = useRef<HTMLInputElement>(null);

  const removeImage = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFile(null);
  };

  const submit = async () => {
    if (!nickname) {
      return;
    }
    if (!msg && !file) {
      return;
    }

    let image = "";
    setIsSending(true);
    try {
      if (file) {
        const snapshot = await uploadToBucket(file);
        image = snapshot.metadata.fullPath;
      }

      await sendMessage({
        image: image,
        publisher: nickname,
        content: msg,
      });
      setMsg("");
      removeImage();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 z-40">
      <div
        className={`h-8 bg-white grid-row-1 grid-cols-12 grid-flow-row w-screen mp-1 ${
          file ? "grid" : "hidden"
        }`}
      >
        <div className="col-start-2 col-end-13 row-start-1 row-end-2 leading-8">
          {file &&
            (file.name.length > 30
              ? `${file.name.slice(0, 15)}...${file.name.slice(
                  file.name.length - 15,
                  file.name.length
                )}`
              : file.name)}
        </div>
        <img
          className={`col-start-1 col-end-2 row-start-1 row-end-2 w-full h-full ${
            file ? "" : "hidden"
          }`}
          src={x}
          alt="remove-image"
          onClick={removeImage}
        />
      </div>
      <div className="w-screen flex h-10 items-center">
        <div className="w-1/12 bg-white inline-grid grid-rows-1 grid-cols-1 h-full border-y border-gray-400">
          <input
            className="col-start-1 col-end-2 row-start-1 row-end-2 opacity-0 w-full h-full"
            type="file"
            accept="image/*"
            name="myImage"
            ref={inputRef}
            onChange={(event) => {
              console.log(event);
              const file = event.currentTarget.files?.[0];
              if (file) {
                setFile(file);
              }
            }}
          />

          <img
            className="col-start-1 col-end-2 row-start-1 row-end-2 w-full h-full"
            src={photogragh}
            alt="upload-image"
          />
        </div>
        <input
          className="w-9/12 h-full border-gray-400 border pl-4 outline-green-600 focus:outline-none focus:shadow focus:shadow-green-600 focus:border-green-600"
          type="text"
          value={msg}
          onChange={(e) => {
            setMsg(e.currentTarget.value);
          }}
          placeholder={nickname ? `From ${nickname}` : "Set your name first."}
        />
        <button
          className="inline-block h-full bg-green-600 text-white font-medium text-md leading-tight shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-2/12 "
          onClick={() => {
            submit().catch((e) => console.error(e));
          }}
        >
          Send
        </button>
      </div>
      <Modal visible={isSending}>
        <div className="bg-white rounded-md flex drop-shadow-sm shadow-slate-50 w-3/6 aspect-video justify-center items-center text-2xl font-light text-gray-900">
          Sending...
        </div>
      </Modal>
    </div>
  );
};
