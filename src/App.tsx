import React from 'react';
import { css, jsx } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
/** @jsx jsx */

import Home from './components/Home/Home';
import Dashboard from './components/Dashoard/Dashboard';
import UserProvider from './Providers/UserProvider';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const appStyle = css``;

function App() {
  return (
    <UserProvider>
      <Router>
        <div className='app' css={appStyle}>
          <Switch>
            <Route exact path='/' component={Home} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
