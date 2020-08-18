export enum MsgTypes {
  "Send",
  "Receive",
  "ComeTips",
  "LeaveTips",
}

export interface MsgProps {
  userName: string;
  content: string;
  type: MsgTypes;
}



