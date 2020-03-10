import React from 'react';
import ReactDom from 'react-dom';
// import { Provider } from 'react-redux';

// import { getRoutes } from './router';
// import store from './store';
// import '../../libs/before-load';
// import 'antd-mobile/dist/antd-mobile.css';
// import './style/index.less';

const App = () => (
  <div>
    this is a test
  </div>
);

ReactDom.render(<App />, global.document.querySelector('#root'));
