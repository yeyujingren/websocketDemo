import React from 'react';
import ReactDom from 'react-dom';
import "@/libs/before-load";
import { Provider } from 'react-redux';
import store from './store'

import 'antd-mobile/dist/antd-mobile.css';

import TodoList from './Component/TodoList';

const App = () => (
  <Provider store={store}>
    <TodoList />
  </Provider>
)

ReactDom.render(<App />, window.document.querySelector('#root') as HTMLElement);
