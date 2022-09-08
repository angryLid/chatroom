/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";
import firebaseApi, { app } from ".";
import { IMessage } from "src/shared";

const db = getFirestore(app);

const firestoreApi = firebaseApi.injectEndpoints({
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
    getBrowsers: builder.query<string[], string>({
      async queryFn(docName) {
        await setDoc(doc(db, "browsers", docName), {
          lastUpdated: serverTimestamp(),
        });
        const snapshot = await getDocs(collection(db, "browsers"));
        // snapshot.forEach(result )

        return {
          data: [...snapshot.docs.map((i) => i.id)],
        };
      },
    }),
  }),
});

export const {
  useAddMessageMutation,
  useGetMessagesQuery,
  useGetBrowsersQuery,
} = firestoreApi;
