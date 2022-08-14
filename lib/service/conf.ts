import { FirebaseOptions, initializeApp } from "firebase/app";

const baseURL =
  process.env.NODE_ENV === "production"
    ? location.origin
    : "http://localhost:5669";
const getConfig = async () => {
  const resp = await fetch(`${baseURL}/api/config`);
  const conf = (await resp.json()) as FirebaseOptions;
  return conf;
};

const conf = await getConfig();

export const app = initializeApp(conf);
