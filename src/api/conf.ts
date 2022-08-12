import { FirebaseOptions, initializeApp } from "firebase/app";

const getConfig = async () => {
  const resp = await fetch("/api/config");
  const conf = (await resp.json()) as FirebaseOptions;
  console.log(
    "%c [getConfig()]:",
    "color:white;background:blue;font-size:13px",
    conf
  );
  return conf;
};

const conf = await getConfig();

export const app = initializeApp(conf);
