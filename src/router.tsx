import React, {FC, ReactElement, SFC, ComponentClass} from 'react';
import {Router, Switch, Route, Redirect, RouteComponentProps} from 'react-router-dom';
import {history} from './utils/history';
import Login from './Component/Regester/Regester';
import Logon from './Component/Regester/Logon';
import Home from './Component/home';

interface RouterPropsInter {
  path: string;
  // component: LazyExoticComponent<FC<{}>>;
  component: FC<RouteComponentProps<any> | undefined> | SFC<RouteComponentProps<any> | undefined> | ComponentClass<RouteComponentProps<any> | undefined>;
  exact: boolean;
  auth?: boolean;
}
const ROUTER_CONFIG: RouterPropsInter[] = [
  {
    path: '/',
    component: Home,
    exact: true,
    auth: true
  },
  {
    path: '/login',
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
  const token: boolean = localStorage.getItem('islogin') === 'true';

  const loadedRoutes: ReactElement[] = ROUTER_CONFIG.map((item) => {
    return <Route
      path={item.path}
      key={item.path}
      exact={item.exact} 
      component={item.component}
      // render={props => {
      //   return (
      //     !item.auth 
      //       ? (<item.component {...props} />) 
      //       : (token ? <item.component {...props} /> : <Redirect to='/login' />)
      //   )
      // }}
    />;
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