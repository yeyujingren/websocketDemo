import React from 'react';
import ReactDom from 'react-dom';
import "@/libs/before-load";
import { Provider } from 'react-redux';
// import store from './store'

// import { getRoutes } from './router';
// import '../../libs/before-load';
import 'antd-mobile/dist/antd-mobile.css';
// import './style/index.less';

import TodoList from './Component/TodoList';

const App = () => (
  <TodoList />
)

ReactDom.render(<App />, window.document.querySelector('#root') as HTMLElement);
