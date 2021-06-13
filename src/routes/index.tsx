import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Drawer } from '../drawer';
import {
  HomeScreen,
  LoginScreen,
  UserRegistryScreen,
  UserScreen,
  SpecialistRegistryScreen,
  ClientsRegisterScreen,
  SpecialistScreen,
  MedRecordCreateScreen,
  MedRecordHistoryScreen,
  NotFoundScreen,
  ClientScreen,
  ServiceRegistryScreen,
  ServicesScreen,
} from '../screens';
import { refPanel } from '../utils';
import { PrivateRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Drawer ref={refPanel} />
    <Switch>
      <AuthRoutes path="/" exact>
        <HomeScreen />
      </AuthRoutes>
      <PrivateRoutes exact path="/client">
        <ClientScreen />
      </PrivateRoutes>
      <PrivateRoutes exact path="/client/registry">
        <ClientsRegisterScreen />
      </PrivateRoutes>
      <PrivateRoutes exact path="/user">
        <UserScreen />
      </PrivateRoutes>
      <PrivateRoutes exact path="/service">
        <ServicesScreen />
      </PrivateRoutes>
      <PrivateRoutes exact path="/service/registry">
        <ServiceRegistryScreen />
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
      <PrivateRoutes exact path="/medrecord/create">
        <MedRecordCreateScreen />
      </PrivateRoutes>
      <PrivateRoutes exact path="/medrecord">
        <MedRecordHistoryScreen />
      </PrivateRoutes>
      <AuthRoutes path="/login" exact>
        <LoginScreen />
      </AuthRoutes>
      <Route path="*">
        <NotFoundScreen />
      </Route>
    </Switch>
  </BrowserRouter>
);

export { Routes };
