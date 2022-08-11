import { useState } from "react";
import { downloadFromBucket } from "../api/database";
import x from "../assets/x.svg";
import { HHmmss, IMessage } from "../shared";
import { AsyncImage } from "./AsyncImage";
import { Modal } from "./Modal";
interface IProps {
  timestamp: string;
  message: IMessage;
}
export const Message = ({ timestamp, message }: IProps) => {
  const [phase, setPhase] = useState<"idle" | "loading" | "loaded">("idle");
  const [$img, set$img] = useState("");

  const showPic = async () => {
    if (phase !== "idle" || !message.image) {
      return;
    }
    setPhase("loading");
    const url = await downloadFromBucket(message.image);
    set$img(`${url}&${Number(new Date())}`);
  };

  return (
    <div>
      <span className="mr-3 text-blue-900 underline font-mono">
        {HHmmss(Number(timestamp))} {message.publisher}
      </span>
      <span className="pr-1">{message.content}</span>

      {message.image && (
        <span
          className="text-blue-500 underline"
          onClick={() => {
            showPic().catch((e) => console.log(e));
          }}
        >
          {phase === "loading" ? "loading... please wait" : "view pic"}
        </span>
      )}
      <Modal visible={phase === "loaded"}>
        <div className="relative">
          <AsyncImage
            src={$img}
            toast={() => {
              setPhase("loaded");
            }}
          />
          <div
            className="h-6 w-6 absolute right-1 -top-7 underline cursor-pointer text-center text-red-600  text-lg"
            onClick={() => setPhase("idle")}
          >
            <img src={x} alt="close-preview" />
          </div>
        </div>
      </Modal>
    </div>
  );
};
