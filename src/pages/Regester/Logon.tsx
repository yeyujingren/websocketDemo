import React, { FC, useEffect, useState } from 'react';
import history from '../../utils/history';
import {InputItem, List, Button, Toast, WingBlank} from 'antd-mobile';
import useForm from 'rc-form-hooks';
import './logon.less';

let timerInterval: NodeJS.Timeout | undefined;

const Logon: FC = () => {

  const [click, setClick] = useState(60);

  const { getFieldDecorator, validateFields } = useForm<{
    usename: string;
    userpwd: string;
    email: string;
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
    console.log(timerInterval)
    if(timerInterval) return;
    // setIsGetCode(!isGetCode);
    timerInterval = setInterval(() => setClick(c => c-1), 1000)
      
  };

  return(
    <div className="logonWapper">
      <div className="logo"></div>
      <div className="logon">
        <List>
          <WingBlank>
            {
              getFieldDecorator('usename', {
                rules: [{
                  required: true,
                  message: '用户名不能为空～'
                }]
              })(
                <div className="emailWapper">
                  <InputItem
                    type="text"
                    placeholder="请输入用户名..."
                    clear
                    extra={<span className="getEmailCode">{click === 60 ? '获取验证码' : `${click}s`}</span>}
                    onExtraClick={getEmailCode}
                  >邮箱：</InputItem>
                  
                </div>
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
                >验证码：</InputItem>
              )
            }
          </WingBlank>
          <WingBlank>
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
      </div>
      <div onClick={goBackHandler}>已有账号</div>
    </div>
  )
}

export default Logon;
