import { useState } from "react";
export interface IMessage {
  content: string;
  publisher: string;
  image?: string;
  kind?: string;
  timestamp?: number;
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

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}
