import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

const AuthRoutes: React.FC<RouteProps> = ({ children, ...rest }) => (
  <Route {...rest} render={() => children} />
);

export { AuthRoutes };
