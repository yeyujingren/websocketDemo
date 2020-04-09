import React, { FC, FormEvent } from 'react';
import { InputItem, List, Button, Toast } from 'antd-mobile';
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

  return (
    <>
      <div className="modal">
        <div className="top"></div>
        <div className="bottom"></div>
      </div>
      <div className="registerWapper">
        <div className="logo"></div>
        <div className="login">
          <List>
            {
              getFieldDecorator('usename', {
                rules: [{
                  required: true,
                  message: 'enter your userName:)'
                }]
              })(
                <InputItem
                  type="text"
                  placeholder="enter your userName"
                  clear
                >用户名：</InputItem>
              )
            }
            {
              getFieldDecorator('userpwd', {
                rules: [{
                  required: true,
                  message: 'enter your userPassword:)'
                }]
              })(
                <InputItem
                  type="password"
                  placeholder="enter your userPassword"
                  clear
                >密码：</InputItem>
              )
            }
          </List>
        </div>
        <Button onClick={submitHandler} type="primary">登陆</Button>
      </div>
    </>
  )
}

export default Regester;
