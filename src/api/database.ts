import { getDatabase, ref, set } from "firebase/database";
import { IMessage } from "../shared";
import { app } from "./conf";

export const db = getDatabase(app);

export const roomPipe = (origin: string | null | undefined) =>
  !origin || origin === "0" ? "messages" : origin;

export async function sendMessage({ publisher, content, image }: IMessage) {
  const id = Number(new Date());

  const room = localStorage.getItem("room");

  return set(ref(db, `${roomPipe(room)}/${id}`), { publisher, content, image });
}
