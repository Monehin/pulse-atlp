import React from 'react';
import { css, jsx } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
/** @jsx jsx */

import Home from './components/Home/Home';
import Dashboard from './components/Dashoard/Dashboard';

const appStyle = css``;

function App() {
  return (
    <Router>
      <div className='app' css={appStyle}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
