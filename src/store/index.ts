/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const init = () => {
  const app = initializeApp(
    JSON.parse(
      import.meta.env.VITE_FIREBASE_CONFIG as string
    ) as FirebaseOptions
  );
  const db = getFirestore(app);
  return { db };
};

export const firebaseSlice = createSlice({
  name: "firebase",
  initialState: init(),
  reducers: {
    todo: (state) => state,
  },
});

// Action creators are generated for each case reducer function

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import {
  createApi,
  fakeBaseQuery,
  setupListeners,
} from "@reduxjs/toolkit/query/react";
import { addDoc, collection } from "firebase/firestore";
import { app } from "../api";
const db = getFirestore(app);
const api = createApi({
  reducerPath: "firebase",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    add: builder.mutation<string, void>({
      async queryFn() {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815,
        });
        return {
          data: docRef.id,
        };
      },
    }),
    getOK: builder.query<number, null>({
      async queryFn() {
        const res = await new Promise<number>((res) => {
          res(100);
        });
        return {
          data: res,
        };
      },
    }),
  }),
});
export const { useAddMutation, useGetOKQuery } = api;
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
