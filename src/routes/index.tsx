import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { HomeScreen, LoginScreen } from '../screens';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <AppRoutes exact path="/">
        <HomeScreen />
      </AppRoutes>
      <AuthRoutes path="/login">
        <LoginScreen />
      </AuthRoutes>
    </Switch>
  </BrowserRouter>
);

export { Routes };
