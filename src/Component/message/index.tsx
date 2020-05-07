import React, { FC, useState, useEffect } from 'react';
import { InputItem, Button } from 'antd-mobile';
// import useForm from 'rc-form-hooks';

import MessageItem from './messageItem';

import './index.less';

const Message: FC = () => {
  // const { getFieldDecorator, validateFields } = useForm<{
  //   message: any;
  // }>();
  const initMsgList: string[] = [];
  const [message, setMessage] = useState('');
  const [msgList, setMsgList] = useState(initMsgList);

  const writeMsgHandler = (msg: string) => {
    setMessage(msg);
  }

  const sendMsgHandler = () => {
    const oMsgList: string[] = [...msgList];
    oMsgList.push(message);
    setMessage('');
    setMsgList(oMsgList);
  }

  useEffect(() => {
    // console.log('update!')
  })

  return (
    <div className="messageWapper">
      <div className="messageListWapper">
        {
          msgList.map(item => {
            return <MessageItem msg={item} />
          })
        }
      </div>
      <div className="sendMsgWapper">
        <InputItem
          value={message}
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
