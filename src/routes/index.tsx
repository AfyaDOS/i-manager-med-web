import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Drawer } from '../drawer';
import {
  HomeScreen,
  LoginScreen,
  UserRegistryScreen,
  SpecialistRegistryScreen,
  ClientsRegisterScreen,
  SpecialistScreen,
} from '../screens';
// import { refPanel } from '../utils';
import { PrivateRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      {/* <Drawer ref={refPanel} /> */}
      <PrivateRoutes exact path="/client/registry">
        <ClientsRegisterScreen />
      </PrivateRoutes>
      <PrivateRoutes exact path="/user/registry">
        <UserRegistryScreen />
      </PrivateRoutes>
      <PrivateRoutes exact path="/specialist">
        <SpecialistScreen />
      </PrivateRoutes>
      <PrivateRoutes exact path="/specialist/registry">
        <SpecialistRegistryScreen />
      </PrivateRoutes>
      <AuthRoutes path="/" exact>
        <HomeScreen />
      </AuthRoutes>
      <AuthRoutes path="/login" exact>
        <LoginScreen />
      </AuthRoutes>
      <Route path="*">
        <div>Page Not Faound</div>
      </Route>
    </Switch>
  </BrowserRouter>
);

export { Routes };
