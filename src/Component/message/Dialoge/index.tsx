import React, { FC, useState, useEffect } from 'react';
import { InputItem, Button } from 'antd-mobile';
import {w3cwebsocket as W3CWbsocket, IMessageEvent} from 'websocket';

import {MsgProps, MsgTypes} from '../type';
import DialogeItem from './DialogeItem';

import './style.less';

const client = new W3CWbsocket('ws://10.130.170.201:8000');

const Dialoge: FC = () => {
  // 初始化消息相关默认值
  const initMsgList: MsgProps[] = [{
    context: 'hello my dear😄',
    msgType: MsgTypes.Receive
  }];
  const initMsg: MsgProps = {
    context: '',
    msgType: MsgTypes.Send
  }

  // init state
  const [message, setMessage] = useState(initMsg);
  const [msgList, setMsgList] = useState(initMsgList);
  const [isDisable, setDisable] = useState(true);

  // 消息输入控制
  const writeMsgHandler = (msg: string) => {
    if(isDisable && msg.length !== 0) {
      setDisable(false);
    }
    setMessage({context: msg, msgType: MsgTypes.Send});
  }

  useEffect(() => {
    client.onopen = () => {
      console.log('网络正常，您可以正常聊天了……')
    };

    // 从服务端接受消息
    client.onmessage = (context: IMessageEvent) => {
      console.log(context);
      const dataFromServer = JSON.parse(context.data as string);
      const receiveMsg: MsgProps = {
        context: '',
        msgType: MsgTypes.Receive
      }
      // if(dataFromServer.type === 'messageSend') {
      //   receiveMsg.context = dataFromServer.data.editorContent;
      // }
      receiveMsg.context = dataFromServer;
      const oMsgList: MsgProps[] = [...msgList];
      oMsgList.push(receiveMsg);
      setMsgList(oMsgList);
    }
  }, [msgList])

  // 当用户加入，通知服务端
  const logInUser = () => {
    const username: string = 'yeyujingren';
    if(username.trim()) {
      const data = {
        username
      };
      client.send(JSON.stringify({
        ...data,
        type: 'userevent'
      }))
    }
  }

  /**
   * 发送数据后通知服务端进行转发
   * 并清空输入框
   */
  const sendMsgHandler = () => {
    const oMsgList: MsgProps[] = [...msgList];
    oMsgList.push(message);
    setMessage(initMsg);
    setMsgList(oMsgList);

    // 发送给服务端进行转发
    // client.send(JSON.stringify({
    //   type: 'messageSend',
    //   context: message.context
    // }))
    client.send(JSON.stringify(message.context));
  }

  return (
    <div className="messageWapper">
      <div className="messageListWapper">
        {
          msgList.map(item => {
            return <DialogeItem key={JSON.stringify(item)} msgType={item.msgType} msg={item.context} />
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
          disabled={isDisable}
        >发送</Button>
      </div>
    </div>
  )
}

export default Dialoge;
