import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// pages
import HomePage from './pages/Home/Home';
import DashboardPage from './pages/Dashoard/Dashboard';
import CohortsPage from './pages/Cohorts/Cohorts';
import ProgramsPage from './pages/Programs/Programs';
import UsersPage from './pages/Users/Users';
import SettingsPage from './pages/Settings/Settings';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>

        <Route exact path='/dashboard'>
          <DashboardPage />
        </Route>

        <Route exact path='/cohorts'>
          <CohortsPage />
        </Route>

        <Route exact path='/programs'>
          <ProgramsPage />
        </Route>

        <Route exact path='/users'>
          <UsersPage />
        </Route>

        <Route exact path='/settings'>
          <SettingsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
