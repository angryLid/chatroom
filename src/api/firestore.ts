/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  doc,
  getFirestore,
  onSnapshot,
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

const getQuery = (publisher: string) => {
  const messagesRef = collection(db, "messages");
  return publisher !== "Collections"
    ? query(messagesRef, where("publisher", "==", publisher))
    : query(messagesRef, where("publisher", "!=", "Unknown"));
};

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
        await Promise.resolve(0);
        // const q = getQuery(publisher);
        // const snapshot = await getDocs(q);
        // const data: IMessage[] = [];
        // snapshot.forEach((d) => data.push(d.data() as IMessage));
        return {
          data: [],
        };
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // let unsub: ReturnType<typeof onSnapshot>;

        await cacheDataLoaded;
        const q = getQuery(arg);
        const unsub = onSnapshot(q, (snapshot) => {
          const toUpdate = snapshot.docs.map((doc) => doc.data()) as IMessage[];

          console.log(" data: ", toUpdate);
          updateCachedData(() => toUpdate);
        });

        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        unsub();
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
            {
              docKey: "Collections",
              osName: "Collections",
              osVersion: "",
              browserName: "All of the following",
              browserVersion: "",
            },
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
