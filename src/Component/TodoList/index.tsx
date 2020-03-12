import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, InputItem, List, Picker, WhiteSpace} from 'antd-mobile';
import useForm  from 'rc-form-hooks';
import {RootState} from '../../store';
import { addItemAction } from './store/action';
import './style.less'

interface ListProps {
  level: number;
  message: string,
  cless: string
}

const levelList = [
  {
    label: '高',
    value: 1
  },
  {
    label: '中',
    value: 2
  },
  {
    label: '低',
    value: 3
  }
]

const TodoList: FC = () => {
  // useState 不需要做类型注释，因为ts会根据初始值对器类型进行判断
  const initValue: Array<ListProps> = [];
  // const [list, setList] = useState(initValue);
  const [imLevel, setImLevel] = useState(1);
  const [isDisabled, setDisabled] = useState(true)
  const dispatch = useDispatch();
  const list = useSelector((state:RootState) => state.todo);

  const {getFieldDecorator, validateFields, resetFields} = useForm<{
    message: string;
  }>();

  const selectHandler = (value: Array<number>) => {
    setImLevel(value[0]);
  }

  const clessHandler = () => {
    let cless = ''
    switch (imLevel) {
      case 1:
        cless = 'lg'
        break;
      case 2:
        cless = 'md'
        break;
      case 3:
        cless = 'sm'
        break;
      default:
        break;
    }
    return cless;
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    validateFields()
      .then(v => {
        // setList([...list, {message:v.message, level: imLevel, cless: clessHandler()}]);
        dispatch(addItemAction({message:v.message, level: imLevel, cless: clessHandler()}))
        resetFields();
        setDisabled(true);
      })
      .catch(err => console.error(err.message));
  }

  const isEmpty = (value: string|undefined) => {
    if(value && isDisabled) {
      setDisabled(false);
    } else if (!value && !isDisabled) {
      setDisabled(true);
    }
  }

  return (
    <div className="todoListWapper">
      <List>
        {getFieldDecorator('message', {
          rules: [{ required: true, message: 'Please input username!' }]
        })(
          <InputItem
            placeholder="请输入您即将要做的事情："
            // onBlur={(v) =>isEmpty(v) }
            clear
            onChange={v=>isEmpty(v)}
          />
        )}
        <Picker
          title="请选择重要等级"
          cols={1}
          extra=""
          data={levelList}
          value={[imLevel]}
          onOk={(v) => selectHandler(v)}
        >
          <List.Item arrow="horizontal">重要等级</List.Item>
        </Picker>
      </List>
      <Button 
        type="primary"
        onClick={submitHandler}
        disabled={isDisabled}
      >添加到List</Button>
      <WhiteSpace size="xl" />
      {
        list.lists.length
          ? <div className="listWapper">
            {
              list.lists.map((item, index) => {
                const key = `${item}${index}`
                return (
                  <span className={item.cless} key={key}>
                    {item.message}
                  </span>
                )
              })
            }
          </div>
          : ''
      }
    </div>
  )
}

export default TodoList;
