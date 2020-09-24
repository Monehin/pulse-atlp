import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// providers
import UserProvider, { UserContext } from './Providers/UserProvider';

// pages
import AuthPage from './pages/Auth/Auth';
import AuthenticatedRoutes from './components/Layout/Layout';

/**
 * Evaluate what route to render the user
 * depending on their authenticated status.
 */
const AuthGate = () => {
  return useContext(UserContext).currentUser ? (
    <AuthenticatedRoutes />
  ) : (
    <AuthPage />
  );
};

function App() {
  return (
    <Router>
      <Route path='/'>
        <UserProvider>
          <AuthGate />
        </UserProvider>
      </Route>
    </Router>
  );
}

export default App;
