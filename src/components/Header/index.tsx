import React from 'react';
import { PrimaryButton } from '@fluentui/react';
import { CardHeader } from './styles';
import logo from '../../assests/images/logo.png';

const Header: React.FC = () => (
  <CardHeader>
    <img src={logo} alt="logo" />
    <PrimaryButton className="button">
      Entrar
    </PrimaryButton>
  </CardHeader>
);

export { Header };
