/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
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
export interface IMessage {
  publisher: string;
  content: string;
  kind: "text/plain";
  timestamp: number;
}
const api = createApi({
  reducerPath: "firebase",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    add: builder.mutation<string, IMessage>({
      async queryFn(message) {
        const docRef = await addDoc(collection(db, "messages"), message);
        return {
          data: docRef.id,
        };
      },
    }),
    getList: builder.query<IMessage[], void>({
      async queryFn() {
        const q = query(
          collection(db, "messages"),
          where("timestamp", ">=", Number(new Date()) - 1000 * 60 * 60 * 24)
        );
        const snapshot = await getDocs(q);

        const data: IMessage[] = [];
        snapshot.forEach((d) => data.push(d.data() as IMessage));
        return {
          data,
        };
      },
    }),
  }),
});
export const { useAddMutation, useGetListQuery } = api;
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
