import React from 'react';
import { connect } from 'dva';
import { Switch, Route, routerRedux, Redirect } from 'dva/router';
import App from './routes/app';
import dynamic from 'dva/dynamic';
import Login from './routes/Login';
import Home from './routes/Home';
import WritePage from './routes/WritePage';
import File from './routes/File';
import Modify from './routes/Modify';
import NotFound from './routes/NotFound';
const { ConnectedRouter } = routerRedux;
function RouterConfig({ history, app }) {
  // const Home = dynamic({
  //   app,
  //   component: () => import('./routes/Home'),
  // });
  // const WritePage = dynamic({
  //   app,
  //   component: () => import('./routes/WritePage'),
  // });
  // const File = dynamic({
  //   app,
  //   component: () => import('./routes/File'),
  // });
  // const Modify = dynamic({
  //   app,
  //   component: () => import('./routes/Modify'),
  // });
  // const NotFound = dynamic({
  //   app,
  //   component: () => import('./routes/NotFound'),
  // });
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Redirect exact from="/" to="/home"/>
          <Route exact path="/login" component={Login} />
          <CheckLoginRoute exact path="/home" component={Home} />
          <CheckLoginRoute exact path="/modify" component={Modify} />
          <CheckLoginRoute exact path="/file/:id([1-4])" component={File} />
          <CheckLoginRoute exact path="/write/:id" component={WritePage} />
          <Redirect exact from="/test" to="/test/1"/>
          <CheckLoginRoute exact path="/test/:id" component={()=><p>敬请期待：）</p>} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
}
function CheckLoginRoute({ component: Component, ...rest }) {
  return !!window.common.readCookie('USERID') ? <Component {...rest} /> : <Redirect to="/login"/>
}
export default RouterConfig;
