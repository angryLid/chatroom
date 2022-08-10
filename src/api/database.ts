import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyByyPMOQCBrVMQtadV6bdXm2o9vgTG7MJk",
  authDomain: "root-patrol-232209.firebaseapp.com",
  projectId: "root-patrol-232209",
  storageBucket: "root-patrol-232209.appspot.com",
  messagingSenderId: "843708408007",
  appId: "1:843708408007:web:6ba2b7420912c87fea1ee2",
  measurementId: "G-YL7BPZPQMD",
  databaseURL:
    "https://root-patrol-232209-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Firebase

// Initialize Realtime Database and get a reference to the service

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);

export function uploadToBucket(file: File) {
  const storageRef = ref(storage, uuidv4());
  return uploadBytes(storageRef, file);
}

export function downloadFromBucket(uuid: string) {
  const pathReference = ref(storage, uuid);
  return getDownloadURL(pathReference);
}
