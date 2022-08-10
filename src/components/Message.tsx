import { useState } from "react";
import { downloadFromBucket } from "../api/database";
import x from "../assets/x.svg";
import { HHmmss, IMessage } from "../shared";
import { Modal } from "./Modal";
interface IProps {
  timestamp: string;
  message: IMessage;
}
export const Message = ({ timestamp, message }: IProps) => {
  const [loading, setLoading] = useState(false);

  const [gallary, setGallary] = useState<JSX.Element | null>(null);

  const showPic = async (path: string) => {
    if (loading) {
      return;
    }
    const url = await downloadFromBucket(path);
    setGallary(<img className="opacity-100" src={url} alt="current-picture" />);
    setLoading(false);
  };
  return (
    <div>
      <span className="mr-3 text-blue-900 underline font-mono">
        {HHmmss(Number(timestamp))} {message.publisher}
      </span>
      {message.content}
      {message.image ? (
        <span
          className="text-blue-500 underline pl-2"
          onClick={() => {
            setLoading(true);
            showPic(message.image || "").catch((e) => console.error(e));
          }}
        >
          {loading ? "loading... please wait" : "view pic"}
        </span>
      ) : (
        ""
      )}
      <Modal visible={!!gallary}>
        <div className="relative">
          {gallary}
          <div
            className="h-6 w-6 absolute right-1 -top-7 underline cursor-pointer text-center text-red-600  text-lg"
            onClick={() => setGallary(null)}
          >
            <img src={x} alt="close-preview" />
          </div>
        </div>
      </Modal>
    </div>
  );
};
