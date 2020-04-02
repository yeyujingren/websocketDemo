import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import './serviceWorker/index';
import "./libs/befor-load";
import store from './store';

import 'antd-mobile/dist/antd-mobile.css';

import Hello from './Component/Hello';

const App = () => (
  <Provider store={store}>
    <Hello />
  </Provider>
)

ReactDom.render(<App />, window.document.querySelector("#root") as HTMLElement);
