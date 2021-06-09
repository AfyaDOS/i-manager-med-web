import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import {
  HomeScreen, LoginScreen, UserRegistryScreen, SpecialistRegistryScreen,
} from '../screens';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <AppRoutes exact path="/">
        <HomeScreen />
      </AppRoutes>
      <AppRoutes exact path="/user/registry">
        <UserRegistryScreen />
      </AppRoutes>
      <AppRoutes exact path="/specialist/registry">
        <SpecialistRegistryScreen />
      </AppRoutes>
      <AuthRoutes path="/login">
        <LoginScreen />
      </AuthRoutes>
    </Switch>
  </BrowserRouter>
);

export { Routes };
