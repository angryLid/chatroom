/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  doc,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";
import firebaseApi, { app } from ".";
import { IMessage } from "src/shared";
import { BrowserDocument } from "src/shared/types";

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
    getMessages: builder.query<IMessage[], string>({
      async queryFn(publisher) {
        const q = query(
          collection(db, "messages"),
          where("publisher", "==", publisher)
        );
        const snapshot = await getDocs(q);
        const data: IMessage[] = [];
        snapshot.forEach((d) => data.push(d.data() as IMessage));
        return {
          data,
        };
      },
      providesTags: ["Message"],
    }),
    getBrowsers: builder.query<BrowserDocument[], BrowserDocument>({
      async queryFn(browser) {
        await setDoc(doc(db, "browsers", browser.docKey), {
          ...browser,
          lastUpdated: serverTimestamp(),
        });
        const snapshot = await getDocs(collection(db, "browsers"));

        return {
          data: [
            ...snapshot.docs.map((i) => ({
              docKey: i.id,
              osName: i.get("osName") as string,
              osVersion: i.get("osVersion") as string,
              browserName: i.get("browserName") as string,
              browserVersion: i.get("browserVersion") as string,
            })),
          ],
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
