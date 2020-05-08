import React, { FC, useState, useEffect } from 'react';
import { InputItem, Button } from 'antd-mobile';

import {MsgProps, MsgTypes} from './type';
import MessageItem from './messageItem';

import './index.less';

const Message: FC = () => {
  // 初始化消息相关默认值
  const initMsgList: MsgProps[] = [];
  const initMsg: MsgProps = {
    context: '',
    msgType: MsgTypes.Send
  }

  // init state
  const [message, setMessage] = useState(initMsg);
  const [msgList, setMsgList] = useState(initMsgList);

  const writeMsgHandler = (msg: string) => {
    setMessage({context: msg, msgType: MsgTypes.Send});
  }

  const sendMsgHandler = () => {
    const oMsgList: MsgProps[] = [...msgList];
    oMsgList.push(message);
    setMessage(initMsg);
    setMsgList(oMsgList);
  }

  return (
    <div className="messageWapper">
      <div className="messageListWapper">
        {
          msgList.map(item => {
            return <MessageItem msgType={item.msgType} msg={item.context} />
          })
        }
      </div>
      <div className="sendMsgWapper">
        <InputItem
          value={message.context}
          onChange={(msg) => writeMsgHandler(msg)}
        >
          <div className="iconfont">&#xe631;</div>
        </InputItem>
        <Button
          type="primary"
          size="small"
          onClick={sendMsgHandler}
        >发送</Button>
      </div>
    </div>
  )
}

export default Message;
