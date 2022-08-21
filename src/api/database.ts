import { get, getDatabase, ref, set } from "firebase/database";
import { IMessage } from "../shared";
import { app } from "./conf";

export const db = getDatabase(app);

export async function sendMessage(
  room: string,
  { publisher, content, image }: IMessage
) {
  const id = Number(new Date());
  return set(ref(db, `${room}/${id}`), {
    publisher,
    content,
    image: image ? image : "",
  });
}

export async function updateActivity(room: string) {
  return set(ref(db, `active/${room}`), Number(new Date()));
}

export async function registerDevice(uuid: string, userAgent: string) {
  return set(ref(db, `devices/${uuid}`), userAgent);
}

export async function fetchDevices() {
  return get(ref(db, "devices"));
}
