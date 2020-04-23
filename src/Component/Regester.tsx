import React, { FC, FormEvent } from 'react';
import { InputItem, List, Button, Toast } from 'antd-mobile';
import history from '../utils/history';
import useForm from 'rc-form-hooks';

import './regester.less';

const Regester: FC = () => {
  const { getFieldDecorator, validateFields } = useForm<{
    usename: string;
    userpwd: string;
  }>();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    validateFields()
      .then(value => {
        Toast.info(value.usename);
      })
      .catch(err => {
        Toast.fail(err.message);
      })
  }

  const goLogon = () => {
    history.push('/logon');
  }
  console.log('aaaa');
  return (
    <>
      <div className="modal">
        <div className="top">
          <div className="gear"></div>
        </div>
        <div className="bottom">
          <div className="gear"></div>
        </div>
      </div>
      <div className="registerWapper">
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
