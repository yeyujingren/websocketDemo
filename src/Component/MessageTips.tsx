import React from 'react';
import './messageTips.less';
import { MsgTypes } from '../pages/message/type';

interface TipsProps {
  userName: string,
  content: string,
  type: MsgTypes
}

const MessgaeTips: React.FC<TipsProps> = (props:TipsProps):JSX.Element => {
  const {userName, type} = props;
  return (
    <div className="msgTips">
      {
        type === MsgTypes.ComeTips
          ? `欢迎${userName}加入聊天^ - ^`
          : `${userName}离开了聊天`
      }
    </div>
  )
}
export default MessgaeTips;

