export interface IMessage {
  publisher: string;
  content: string;
  kind: "text/plain";
  timestamp: number;
}

export interface IDeviceView {
  uuid: string;
  os: string;
  browser: string;
  myself: boolean;
  kind: "desktop" | "mobile" | "aggravation";
}

export interface BrowserDocument {
  docKey: string;
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
}
