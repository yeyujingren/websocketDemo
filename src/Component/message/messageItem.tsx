import React, { FC, SFC, ReactElement } from 'react';
import {MsgItemProps} from './type';

const MessageItem: FC<MsgItemProps> = (props: MsgItemProps) => {
  const {msg, msgType} = props;
  return (
    <div className={`messageItem msgType_${msgType}`}>
      <div className="arrow"></div>
      <div className="msgContent">
        {msg}
      </div>
    </div>
  )
}

export default MessageItem;
