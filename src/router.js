import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Home from './routes/Home';
import File from './routes/File';
import App from './routes/app';
import Login from './routes/Login';
import NotFound from './routes/NotFound';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <Route path="home" component={Home}/>
        <Route path="file/:id" component={File}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  );
}

export default RouterConfig;
