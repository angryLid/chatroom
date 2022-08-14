import { VercelRequest, VercelResponse } from "@vercel/node";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { get, getDatabase, ref, remove } from "firebase/database";

interface IRooms {
  [key: string]: number;
}
export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.json({ code: 401 });
  }
  const { authorization } = req.headers;
  const CRON_SECRET = process.env.CRON_SECRET || "";
  if (!authorization || authorization !== `Bearer ${CRON_SECRET}`) {
    res.json({ code: 401 });
    return;
  }

  try {
    const config = JSON.parse(
      process.env.FIREBASE_CONFIG || "{}"
    ) as FirebaseOptions;

    const app = initializeApp(config);
    const db = getDatabase(app);
    const snapshot = await get(ref(db, "active/"));
    const roomList = snapshot.val() as IRooms;

    // const minute = 1000 * 60;
    const day = 1000 * 60 * 60 * 24;
    const now = Number(new Date());
    for (const [k, v] of Object.entries(roomList)) {
      if (now - v > day) {
        await remove(ref(db, `${k}`));
      }
    }
    res.json({ code: 200 });
  } catch (e) {
    console.error(e);
    res.json({ code: 500 });
  }
}
