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
    uploadFile: builder.mutation<null, { file: File; id: string }>({
      async queryFn({ id, file }) {
        try {
          const fileRef = ref(storage, `files/${id}`);
          await uploadBytes(fileRef, file);
          return {
            data: null,
          };
        } catch (error) {
          return {
            error,
          };
        }
      },
    }),
    downloadFile: builder.query<string, string>({
      async queryFn(id) {
        try {
          const fileRef = ref(storage, `files/${id}`);
          const url = await getDownloadURL(fileRef);
          return {
            data: url,
          };
        } catch (error) {
          return {
            error,
          };
        }
      },
    }),
  }),
});

export const { useTodoQuery, useUploadFileMutation, useLazyDownloadFileQuery } =
  storageApi;
