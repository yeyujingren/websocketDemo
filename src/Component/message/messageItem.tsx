import React, { FC, SFC, ReactElement } from 'react';

interface Props {
  msg: string;
}

const MessageItem: FC<Props> = (props: Props) => {
  const {msg} = props;
  return (
    <div className="messageItem">
      <div className="arrow"></div>
      <div className="msgContent">
        {msg}
      </div>
    </div>
  )
}

export default MessageItem;
