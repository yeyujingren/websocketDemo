export enum MsgTypes {
  Send,
  Receive
}

export interface MsgProps {
  context: string;
  msgType: MsgTypes;
}

export interface MsgItemProps {
  msg: string;
  msgType: MsgTypes
}




