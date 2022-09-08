/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { FirebaseOptions, initializeApp } from "firebase/app";

export const app = initializeApp(
  JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG as string) as FirebaseOptions
);

const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Message"],
  endpoints: () => ({}),
});

export default firebaseApi;
