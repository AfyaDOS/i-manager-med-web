import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ContextApp } from '../context';

const PrivateRoutes: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user: { isAuthenticated } } = useContext(ContextApp);

  return (
    <Route
      {...rest}
      render={({ location }) => (isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export { PrivateRoutes };
