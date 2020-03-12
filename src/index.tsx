import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'

// import { getRoutes } from './router';
// import '../../libs/before-load';
import 'antd-mobile/dist/antd-mobile.css';
// import './style/index.less';

import Hello from './Component/Hello';

const App = () => (
  <Provider store={store}>
    <Hello 
      name= "TypeScript"
      enthusiasnLevel={2}
    />
  </Provider>
)

ReactDom.render(<App />, window.document.querySelector('#root') as HTMLElement);
