import React, { useState, useEffect, useCallback } from 'react';
import { InputItem, Button, NavBar, Icon, Toast } from 'antd-mobile';
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

  const getMsg = useCallback((msg: {data: Array<MsgProps>}) => {
    const {data} = msg;
    const receiveMsg: MsgProps = {
      content: data[0].content,
      type: data[0].type,
      userName: data[0].userName,
    }
    const oMsgList: MsgProps[] = [...msgList];
    oMsgList.push(receiveMsg);
    setMsgList(oMsgList);
  }, [msgList])

  useEffect(() => {
    // tips: socket定义的监听事件因该及时销毁，否则会占用资源，导致程序崩溃
    // 从服务端接受消息
    socket.on('news', getMsg)
    return () => {
      socket.removeEventListener('news', getMsg)
    }
  }, [getMsg, msgList])

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
