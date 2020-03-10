import React from 'react';
import ReactDom from 'react-dom';
// import { Provider } from 'react-redux';

// import { getRoutes } from './router';
// import store from './store';
// import '../../libs/before-load';
// import 'antd-mobile/dist/antd-mobile.css';
// import './style/index.less';

import {Hello} from './Component/Hello';

const App = () => (
  <Hello 
    compiler= "TypeScript"
    framework="React"
  />
)

ReactDom.render(<App />, window.document.querySelector('#root'));
