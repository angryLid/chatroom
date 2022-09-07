export interface IMessage {
  publisher: string;
  content: string;
  kind: "text/plain";
  timestamp: number;
}
