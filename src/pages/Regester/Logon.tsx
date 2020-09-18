import React, { FC, useEffect, useState } from 'react';
import history from '../../utils/history';
import {InputItem, List, Button, Toast, WingBlank, WhiteSpace} from 'antd-mobile';

import {sendEmailCode, register} from '../../service/user'

import useForm from 'rc-form-hooks';
import './logon.less';

let timerInterval: NodeJS.Timeout | undefined;

const Logon: FC = () => {

  const [click, setClick] = useState(60);
  const [email, setEmail] = useState<string>();

  const { getFieldDecorator, validateFields } = useForm<{
    username: string;
    userpwd: string;
    email: string;
    verifyCode: string;
  }>();
  
  // 返回首页
  const goBackHandler:()=>void = () => {
    history.push('/login')
  }

  useEffect(() => {
    console.log(click, timerInterval)
    if(click < 0) {
      clearInterval(timerInterval as NodeJS.Timeout );
      timerInterval = undefined;
      setClick(60);
    }
  }, [click]);

  // 获取验证码
  const getEmailCode = () => {
    if(timerInterval) return;
    sendEmailCode({email: email as string})
      .then(res => {
        if(res.data.code === 1) {
          Toast.success(res.data.msg);
          timerInterval = setInterval(() => setClick(c => c-1), 1000)
        } else {
          Toast.fail(res.data.msg);
        }
      })
      .catch(error => {
        console.log(error);
      })
  };

  // 注册
  const registerHandler = () => {
    validateFields()
      .then(value => {
        register(value)
          .then(res => {
            if(res.data.code === 1) {
              Toast.success(res.data.msg);
              history.push('/login');
              return;
            }
            Toast.fail(res.data.msg);
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        Toast.fail(err.message);
      })
  }

  return(
    <div className="logonWapper">
      <div className="logo"></div>
      <div className="logon">
        <List>
          <WingBlank>
            {
              getFieldDecorator('email', {
                rules: [{
                  required: true,
                  message: '邮箱地址不能为空～'
                }]
              })(
                <div className="emailWapper">
                  <InputItem
                    type="text"
                    placeholder="请输入邮箱地址..."
                    onChange={val => setEmail(val)}
                    clear
                    extra={<span className="getEmailCode">{click === 60 ? '获取验证码' : `${click}s`}</span>}
                    onExtraClick={getEmailCode}
                  >邮箱：</InputItem>
                  
                </div>
              )
            }
            {
              getFieldDecorator('verifyCode', {
                rules: [{
                  required: true,
                  message: '请输入邮箱验证码～'
                }]
              })(
                <InputItem
                  type="text"
                  placeholder="请输入验证码..."
                  clear
                >验证码：</InputItem>
              )
            }
          </WingBlank>
          <WingBlank>
            {
              getFieldDecorator('username', {
                rules: [{
                  required: true,
                  message: '用户昵称不能为空～'
                }]
              })(
                <InputItem
                  type="text"
                  placeholder="请输入用户昵称..."
                  clear
                >用户名：</InputItem>
              )
            }
            {
              getFieldDecorator('userpwd', {
                rules: [{
                  required: true,
                  message: '密码不能为空～'
                }]
              })(
                <InputItem
                  type="password"
                  placeholder="请输入密码..."
                  clear
                >密码：</InputItem>
              )
            }
          </WingBlank>
        </List>
        <WhiteSpace size="xl" />
        <Button onClick={registerHandler} type="primary">注册</Button>
      </div>
      <span className="toLogin" onClick={goBackHandler}>已有账号</span>
    </div>
  )
}

export default Logon;
