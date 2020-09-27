import React, { useState, useEffect, useCallback } from 'react';
import { InputItem, Button, NavBar, Icon, Toast } from 'antd-mobile';
// import {w3cwebsocket as W3CWbsocket, IMessageEvent} from 'websocket';
import io from 'socket.io-client';
import history from '../../../utils/history';

import {MsgProps, MsgTypes} from '../type';
import DialogeItem from './DialogeItem';
import MessageTips from '../../../Component/MessageTips';

import './style.less';

const DEFAULT_NAME = 'yeyujingren';

// const client = new W3CWbsocket('ws://localhost:9520/socket/chat');
const socket = io('http://10.130.170.201:9521/chat', {
  query: {},
  autoConnect: false,
  reconnectionAttempts: 3,
  transports: ['websocket']
});

const Dialoge: React.FC = () => {
  // 初始化消息相关默认值
  const initMsgList: MsgProps[] = [{
    content: 'hi~my dear. It has been a long time. How are you?',
    type: MsgTypes.Receive,
    userName: DEFAULT_NAME
  }];

  const initProps = {
    content: '',
    type: MsgTypes.Send,
    userName: DEFAULT_NAME
  }

  // init state
  const [message, setMessage] = useState<MsgProps>(initProps);
  const [isConnect, setIsConnect] = useState<Boolean>(false);
  const [msgList, setMsgList] = useState<Array<MsgProps>>(initMsgList);
  const [isDisable, setDisable] = useState(true);

  // 消息输入控制
  const writeMsgHandler = (msg: string) => {
    if(isDisable && msg.length !== 0) {
      setDisable(false);
    } else if(!isDisable && msg.length ===0) {
      setDisable(true)
    }
    setMessage({
      content: msg, 
      type: MsgTypes.Send,
      userName: DEFAULT_NAME
    });
  }

  // 当用户加入，通知服务端
  const logInUser = useCallback((isLeave) => {
    const username: string = DEFAULT_NAME;
    if(username.trim()) {
      const data: MsgProps = {
        content: '',
        type: isLeave ? MsgTypes.LeaveTips: MsgTypes.ComeTips,
        userName: username
      };
      // client.send(JSON.stringify(data))
    }
  }, [])

  useEffect(() => {
    socket.open();
    socket.on('connect', () => {
      const {id} = socket;
      logInUser(false);
      setIsConnect(true);
      console.log('网络正常，您可以正常聊天了……', id);
    });

    return () => {
      logInUser(true);
      socket.disconnect();
      console.log('websocket has disconnection success!')
    }
  }, [logInUser]);

  useEffect(() => {
    // 从服务端接受消息
    socket.on('news', (msg: any) => {
      console.log('msg----->', msg)
    })
    // client.onmessage = (content: IMessageEvent) => {
    //   console.log(content);
    // const dataFromServer = JSON.parse(content.data as string);
    // const receiveMsg: MsgProps = {
    //   content: dataFromServer.content,
    //   type: dataFromServer.type,
    //   userName: dataFromServer.userName,
    // }

    // console.log("dataFromServer", dataFromServer );
    
    // const oMsgList: MsgProps[] = [...msgList];
    // oMsgList.push(receiveMsg);
    // setMsgList(oMsgList);
    // }
  }, [msgList])

  /**
   * 发送数据后通知服务端进行转发
   * 并清空输入框
   */
  const sendMsgHandler = () => {
    if(isConnect) {
      const oMsgList: MsgProps[] = [...msgList];
      oMsgList.push(message);
      // client.send(JSON.stringify(message));
      socket.emit('send', { text: '11111111'});

      // 各种状态还原
      setMessage(initProps);
      setMsgList(oMsgList);
      setDisable(true);
    } else {
      Toast.fail('请检查您的网络')
    }
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
            item.type === MsgTypes.ComeTips ||  item.type === MsgTypes.LeaveTips
              ? <MessageTips {...item} /> 
              : <DialogeItem key={JSON.stringify(`${item.content}_${index}`)} {...item} />
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
