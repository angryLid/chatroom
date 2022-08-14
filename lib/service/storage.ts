// Images upload & download functions

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { app } from "./conf";

const storage = getStorage(app);

export function uploadToBucket(file: File) {
  const storageRef = ref(storage, uuidv4());
  return uploadBytes(storageRef, file);
}

export function downloadFromBucket(uuid: string) {
  const pathReference = ref(storage, uuid);
  return getDownloadURL(pathReference);
}
