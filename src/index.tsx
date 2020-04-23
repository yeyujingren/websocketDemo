import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import "./libs/befor-load";
import SW from './sw';
import store from './store';

import 'antd-mobile/dist/antd-mobile.css';

import getRoutes from './router';

SW();
const App = () => (
  <Provider store={store}>
    {getRoutes()}
  </Provider>
)

ReactDom.render(<App />, window.document.querySelector("#root") as HTMLElement);
