import React, { FC, } from 'react';
import {MsgProps} from '../type';

const DialogeItem: FC<MsgProps> = (props: MsgProps) => {
  const {content, type} = props;
  return (
    <div className={`messageItem msgType_${type}`}>
      <div className="arrow"></div>
      <div className="msgContent">
        {content}
      </div>
    </div>
  )
}

export default DialogeItem;
