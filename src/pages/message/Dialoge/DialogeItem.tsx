import React, { FC, } from 'react';
import {MsgItemProps} from '../type';

const DialogeItem: FC<MsgItemProps> = (props: MsgItemProps) => {
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

export default DialogeItem;
