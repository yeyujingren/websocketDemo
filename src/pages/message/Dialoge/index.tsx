import React, { useState, useEffect, useCallback } from 'react';
import { InputItem, Button, NavBar, Icon } from 'antd-mobile';
import {w3cwebsocket as W3CWbsocket, IMessageEvent} from 'websocket';
import history from '../../../utils/history';

import {MsgProps, MsgTypes} from '../type';
import DialogeItem from './DialogeItem';
import MessageTips from '../../../Component/MessageTips';

import './style.less';

const client = new W3CWbsocket('ws://10.130.170.201:8000');

const Dialoge: React.FC = () => {
  // 初始化消息相关默认值
  const initMsgList: MsgProps[] = [{
    content: 'aha, its a sunnly day, isn\'t it?😄',
    msgType: MsgTypes.Receive
  }];
  const initMsg: MsgProps = {
    content: '',
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
    } else if(!isDisable && msg.length ===0) {
      setDisable(true)
    }
    setMessage({content: msg, msgType: MsgTypes.Send});
  }

  // 当用户加入，通知服务端
  const logInUser = useCallback(() => {
    const username: string = 'yeyujingren';
    if(username.trim()) {
      const data = {
        content: username
      };
      client.send(JSON.stringify({
        ...data,
        type: MsgTypes.Tips
      }))
    }
  }, [])

  useEffect(() => {
    client.onopen = () => {
      logInUser();
      console.log('网络正常，您可以正常聊天了……')
    };
  }, []);

  useEffect(() => {
    // 从服务端接受消息
    client.onmessage = (content: IMessageEvent) => {
      const dataFromServer = JSON.parse(content.data as string);
      const receiveMsg: MsgProps = {
        content: '',
        msgType: MsgTypes.Receive
      }
      console.log("dataFromServer", dataFromServer )
      receiveMsg.content = dataFromServer.content;
      receiveMsg.msgType = dataFromServer.type;
      
      const oMsgList: MsgProps[] = [...msgList];
      oMsgList.push(receiveMsg);
      setMsgList(oMsgList);
    }
  }, [msgList])

  /**
   * 发送数据后通知服务端进行转发
   * 并清空输入框
   */
  const sendMsgHandler = () => {
    const oMsgList: MsgProps[] = [...msgList];
    oMsgList.push(message);
    setMessage(initMsg);
    setMsgList(oMsgList);
    setDisable(true);
    // 发送给服务端进行转发
    // client.send(JSON.stringify({
    //   type: 'messageSend',
    //   context: message.context
    // }))
    const sendMsg: MsgProps = {
      content: message.content,
      msgType: MsgTypes.Send
    }
    client.send(JSON.stringify(sendMsg));
  }
  
  const goBack = () => {
    history.goBack();
  }

  return (
    <div className="messageWapper">
      <NavBar 
        mode='light'
        icon={<Icon type='left' />}
        onLeftClick={goBack}
      >
        聊天室001
      </NavBar>
      <div className="messageListWapper">
        {
          msgList.map((item, index) => (
            item.msgType === MsgTypes.Tips 
              ? <MessageTips name={item.content} /> 
              : <DialogeItem key={JSON.stringify(`${item.content}_${index}`)} msgType={item.msgType} msg={item.content} />
          ))
        }
      </div>
      <div className="sendMsgWapper">
        <InputItem
          value={message.content}
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
