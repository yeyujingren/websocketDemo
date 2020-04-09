import React, {lazy, LazyExoticComponent, FC, ReactElement} from 'react';
import {Router, Switch, Route, RouteProps, RouteComponentProps} from 'react-router-dom';
import {history} from './utils/history';

interface RouterPropsInter {
  path: string;
  component: LazyExoticComponent<FC<{}>>;
  exact: boolean;
}

const ROUTER_CONFIG: RouterPropsInter[] = [
  {
    path: '/login',
    component: lazy(() => (
      import(/* webpackChunkName: '/login' */ './Component/Regestr')
    )),
    exact: true
  }
];

const getRoutes: FC = () => {
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
