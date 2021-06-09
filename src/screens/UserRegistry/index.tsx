import React, { useState, useEffect } from 'react';
import {
  TextField,
  PrimaryButton,
} from '@fluentui/react';
import api from '../../services';
import { Card, CardUser } from './styles';
import user from '../../assests/images/user.png';
import { Header } from '../../components/Header';

const UserRegistry: React.FC = () => {
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const headers = {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0ZDIzZjhjLTczZjUtNDhiZC04NjliLWM5YmQ4M2Y4MGE0MSIsIm5hbWUiOiJtYXJjZWxvIiwiaWF0IjoxNjIzMTIwODUxLCJleHAiOjE2MjMyMDcyNTF9.UwFxvXyJtevb9csR14zSRhuIfI2mo5ScY5AsmqmNMuU',
  };

  useEffect(() => {
    api.get('/users', { headers }).then((res) => console.log(res.data));
  }, []);

  function register() {
    api
      .post(
        '/users',
        {
          name,
          email,
          password,
        },
        { headers },
      )
      .then((res) => res.status);
  }

  return (
    <Card>
      <Header />
      <CardUser>
        <div className="title">
          <div>
            <img src={user} alt="logo especialista" className="logo" />
          </div>
          <div className="textCardHeader">
            <h1>Cadastro de Usuário</h1>
            <p>
              Para cadastrar, preencha os campos abaixo com os dados do
              usuário.
            </p>
          </div>
        </div>

        <div className="textColumn">
          <TextField
            onChange={(i, text) => setName(text)}
            label="Name"
            placeholder="Ex: Marcelo"
            value={name}
          />

          <TextField
            onChange={(i, text) => setEmail(text)}
            label="E-mail"
            placeholder="Ex: marcelo@email.com"
            value={email}
          />

          <TextField
            onChange={(i, text) => setPassword(text)}
            label="Senha"
            placeholder="Ex: *****"
            value={password}
          />
          <PrimaryButton className="button" onClick={register}>
            Cadastrar
          </PrimaryButton>
        </div>
      </CardUser>
    </Card>
  );
};

export { UserRegistry };
