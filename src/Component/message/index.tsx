import React, { FC, useState } from 'react';
import { InputItem, Button } from 'antd-mobile';
// import useForm from 'rc-form-hooks';

import MessageItem from './messageItem';

import './index.less';

const Message: FC = () => {
  // const { getFieldDecorator, validateFields } = useForm<{
  //   message: any;
  // }>();

  const [message, setMessage] = useState('');

  const writeMsgHandler = (msg: string) => {
    setMessage(msg);
  }

  return (
    <div className="messageWapper">
      <div className="messageListWapper">
        <MessageItem msg="hello😄，🔥" />
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
        >发送</Button>
      </div>
    </div>
  )
}

export default Message;
