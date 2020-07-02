import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../Providers/UserProvider';

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  const { currentUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? <RouteComponent {...routeProps} /> : <Redirect to={'/'} />
      }
    />
  );
};

export default PrivateRoute;
