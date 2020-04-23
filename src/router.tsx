import React, {lazy, LazyExoticComponent, FC, ReactElement} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {history} from './utils/history';
import Login from './Component/Regester';
import Logon from './Component/Logon';

interface RouterPropsInter {
  path: string;
  // component: LazyExoticComponent<FC<{}>>;
  component: FC;
  exact: boolean;
}
const ROUTER_CONFIG: RouterPropsInter[] = [
  {
    path: '/',
    component: Login,
    exact: true
  },
  {
    path: '/logon',
    component: Logon,
    exact: true
  }
];

const getRoutes = () => {
  const loadedRoutes: ReactElement[] = ROUTER_CONFIG.map((item) => {
    return <Route path={item.path} component={item.component} key={item.path} exact={item.exact} />;
  });

  return (
    <Router history={history}>
      <Switch>
        {loadedRoutes}
      </Switch>
    </Router>
  )
}

export default getRoutes;
