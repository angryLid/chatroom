import { FirebaseOptions, initializeApp } from "firebase/app";

export const app = initializeApp(
  JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG as string) as FirebaseOptions
);
