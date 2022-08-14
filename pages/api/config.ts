import { VercelRequest, VercelResponse } from "@vercel/node";
import { FirebaseOptions } from "firebase/app";
export default function (req: VercelRequest, res: VercelResponse) {
  const config = JSON.parse(
    process.env.FIREBASE_CONFIG || "{}"
  ) as FirebaseOptions;
  res.json(config);
}
