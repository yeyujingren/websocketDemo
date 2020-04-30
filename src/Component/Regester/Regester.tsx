import React, { FC, FormEvent, useEffect, useState } from 'react';
import { InputItem, List, Button, Toast } from 'antd-mobile';
import history from '../../utils/history';
import useForm from 'rc-form-hooks';

import './regester.less';

const Regester: FC = () => {

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // 验证是否是首次登录，判定是否展示入场动画
    if(window.localStorage.getItem('isFirst') !== 'false') {
      window.localStorage.setItem('isFirst', 'false')
    } else {
      setFlag(true);
    }
  }, [localStorage.getItem('islogin')])

  const { getFieldDecorator, validateFields } = useForm<{
    usename: string;
    userpwd: string;
  }>();

  // 用户登录表单验证
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    validateFields()
      .then(value => {
        // if username === 'admin' && pwd === '9520'
        const {usename, userpwd} = value;
        if(usename === 'admin' && userpwd === '9520') {
          localStorage.setItem('islogin', 'true');
          history.push('/');
        } else {
          Toast.fail('哎呀，用户名或者密码有问题呦～')
        }
      })
      .catch(err => {
        Toast.fail(err.message);
      })
  }

  // 注册路由跳转
  const goLogon = () => {
    history.push('/logon');
  }

  return (
    <>
      {
        flag
          ? null
          : <div className="modal">
            <div className="top">
              <div className="gear"></div>
            </div>
            <div className="bottom">
              <div className="gear"></div>
            </div>
          </div>
      }
      <div className={`registerWapper ${flag ? '' : 'firstCome'}`}>
        <div className="logo"></div>
        <div className="login">
          <List>
            {
              getFieldDecorator('usename', {
                rules: [{
                  required: true,
                  message: '用户名不能为空～'
                }]
              })(
                <InputItem
                  type="text"
                  placeholder="请输入用户名..."
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
          </List>
        </div>
        <div className="logon">
          <span onClick={goLogon}>
            去注册?
          </span>
        </div>
        <Button onClick={submitHandler} type="primary">登陆</Button>
      </div>
    </>
  )
}

export default Regester;
