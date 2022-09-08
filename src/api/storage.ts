// Images upload & download functions

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import firebaseApi, { app } from ".";
const storage = getStorage(app);

const storageApi = firebaseApi.injectEndpoints({
  endpoints: (builder) => ({
    todo: builder.query({
      queryFn() {
        return {
          data: 0,
        };
      },
    }),
  }),
});

export const { useTodoQuery } = storageApi;
