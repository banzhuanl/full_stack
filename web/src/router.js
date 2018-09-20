import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
//import IndexPage from './routes/IndexPage';
//import BasicLayout from './routes/layout/BasicLayout'
import Side1A from './routes/tab1/sideA/sideA'
import Side1B from './routes/tab1/sideB/sideB'
import Side1C from './routes/tab1/sideC/sideC'
import Side2A from './routes/tab2/sideA/sideA'
import Side2B from './routes/tab2/sideB/sideB'
import Side2C from './routes/tab2/sideC/sideC'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/tab1/sideA" component={Side1A} />
        <Route path="/tab1/sideB" component={Side1B} />
        <Route path="/tab1/sideC" component={Side1C} />
        <Route path="/tab2/sideA" component={Side2A} />
        <Route path="/tab2/sideB" component={Side2B} />
        <Route path="/tab2/sideC" component={Side2C} />
        <Redirect to="tab1/sideA" />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
