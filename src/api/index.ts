// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { ref, set } from "firebase/database";
import { IMessage } from "../shared";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { db } from "./database";

export const roomPipe = (origin: string | null | undefined) =>
  !origin || origin === "0" ? "messages" : origin;

export async function sendMessage({ publisher, content, image }: IMessage) {
  const id = Number(new Date());

  const room = localStorage.getItem("room");

  return set(ref(db, `${roomPipe(room)}/${id}`), { publisher, content, image });
}

// const starCountRef = ref(db, 'posts/' + postId + '/starCount');
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });
