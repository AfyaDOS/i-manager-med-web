import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PrimaryButton, TextField, useTheme } from '@fluentui/react';
import { ContextApp } from '../../context';
import { Card } from './styles';
import { open } from '../../utils';

const Login: React.FC = () => {
  const { login } = useContext(ContextApp);
  const theme = useTheme();
  const [email, setUser] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const history = useHistory();

  async function userLogin() {
    await login({ email, password });
    history.push('/');
  }

  return (
    <div>
      <Card theme={theme}>
        <h1>Clientes</h1>
        <p>Nome:</p>
      </Card>
      <TextField onChange={(_, text) => setUser(text)} label="UserName" />
      <TextField onChange={(_, text) => setPassword(text)} label="PassWord" type="password" />
      <PrimaryButton onClick={userLogin}>
        LOGIN
      </PrimaryButton>

      <PrimaryButton onClick={open}>
        LOGIN
      </PrimaryButton>
    </div>
  );
};

export { Login };
