/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

import { IMessage } from "src/shared";
import { app } from ".";
const db = getFirestore(app);

const firestoreApi = createApi({
  reducerPath: "firestoreApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Message"],
  endpoints: (builder) => ({
    addMessage: builder.mutation<string, IMessage>({
      async queryFn(message) {
        const docRef = await addDoc(collection(db, "messages"), message);
        return {
          data: docRef.id,
        };
      },
      invalidatesTags: ["Message"],
    }),
    getMessages: builder.query<IMessage[], void>({
      async queryFn() {
        const snapshot = await getDocs(collection(db, "messages"));
        const data: IMessage[] = [];
        snapshot.forEach((d) => data.push(d.data() as IMessage));
        return {
          data,
        };
      },
      providesTags: ["Message"],
    }),
  }),
});

export const { useAddMessageMutation, useGetMessagesQuery } = firestoreApi;
export default firestoreApi;
