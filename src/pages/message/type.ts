export enum MsgTypes {
  Send,
  Receive,
  Tips
}

export interface MsgProps {
  content: string;
  msgType: MsgTypes;
}

export interface MsgItemProps {
  msg: string;
  msgType: MsgTypes
}




