import React from 'react';
import './messageTips.less';

interface TipsProps {
  name: string
}

const MessgaeTips: React.FC<TipsProps> = (props:TipsProps):JSX.Element => {
  const {name} = props;
  return (
    <div className="msgTips">
      {name}加入聊天^ - ^
    </div>
  )
}
export default MessgaeTips;

