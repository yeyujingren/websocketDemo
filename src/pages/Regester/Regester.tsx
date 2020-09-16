import React, { FC, FormEvent, useEffect, useState } from 'react';
import { InputItem, List, Button, Toast } from 'antd-mobile';

import {login} from '../../service/user'
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
  }, [])

  const { getFieldDecorator, validateFields } = useForm<{
    username: string;
    userpwd: string;
  }>();

  // 用户登录表单验证
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    validateFields()
      .then(value => {
        login(value)
          .then(res => {
            if(res.data.code === 1) {
              localStorage.setItem('islogin', 'true');
              history.push('/');
            } else {
              Toast.fail(res.data.msg)
            }
          })
          .catch(error => {
            console.log(error);
          })
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
              getFieldDecorator('username', {
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
