export interface IMessage {
  content: string;
  publisher: string;
  image?: string;
}

export interface IMsgList {
  [key: string]: IMessage;
}

export function HHmmss(timestamp: number) {
  const time = new Date(timestamp);
  const HH = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");
  return `${HH}:${mm}:${ss}`;
}

export function MMslashDD(timestamp: number) {
  const time = new Date(timestamp);
  const MM = String(time.getMonth() + 1).padStart(2, "0");
  const DD = String(time.getDate()).padStart(2, "0");
  return `${MM}/${DD}`;
}
const colorList = [
  "red",
  "orange",
  "yellow",
  "emerald",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "pink",
] as const;
export function nameColor(name: string) {
  if (name.length < 1) {
    throw new Error("invalid name");
  }
  return `text-${colorList[name.charCodeAt(0) % 10]}-500`;
}
