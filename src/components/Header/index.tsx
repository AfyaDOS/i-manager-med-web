import React from 'react';
import { useHistory } from 'react-router-dom';
import { PrimaryButton } from '@fluentui/react';
import { CardHeader } from './styles';
import logo from '../../assests/images/logo.png';

const Header: React.FC = () => {
  const history = useHistory();
  return (
    <CardHeader>
      <img src={logo} alt="logo" />
      <PrimaryButton className="button" onClick={() => history.push('/login')}>
        Entrar
      </PrimaryButton>
    </CardHeader>
  );
};

export { Header };
