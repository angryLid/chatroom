import { FirebaseOptions, initializeApp } from "firebase/app";

const baseURL =
  process.env.VERCEL_ENV === "development"
    ? "http://localhost:5669"
    : process.env.VERCEL_URL || "";

const getConfig = async () => {
  const resp = await fetch(`${baseURL}/api/config`);
  const conf = (await resp.json()) as FirebaseOptions;
  return conf;
};

const conf = await getConfig();

export const app = initializeApp(conf);
