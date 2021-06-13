import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, PrimaryButton } from '@fluentui/react';
import styles, { CardHeader } from './styles';
import logo from '../../assests/images/logo.png';
import { ContextApp } from '../../context';
import { open } from '../../utils';

const Header: React.FC = () => {
  const history = useHistory();
  const { user: { isAuthenticated } } = useContext(ContextApp);
  return (
    <CardHeader>
      {isAuthenticated && (
      <IconButton
        onClick={open}
        iconProps={{
          iconName: 'CollapseMenu',
          styles: { root: { fontSize: 30 } },
        }}
      />
      )}
      <img src={logo} alt="logo" />
      {!isAuthenticated && (
        <PrimaryButton
          style={styles.buttonLogin}
          onClick={() => history.push('/login')}
        >
          Entrar
        </PrimaryButton>
      )}
    </CardHeader>
  );
};

export { Header };
