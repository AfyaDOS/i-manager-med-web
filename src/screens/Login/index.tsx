import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PrimaryButton, TextField, useTheme } from '@fluentui/react';
import { toast, ToastContainer } from 'react-toastify';
import { ContextApp } from '../../context';
import { Card } from './styles';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import logo from '../../assests/images/logo.png';
import logoAfyados from '../../assests/images/logosAfyados.png';
import doctor from '../../assests/images/doctor.png';
import 'react-toastify/dist/ReactToastify.min.css';

const Login: React.FC = () => {
  const { login } = useContext(ContextApp);
  const theme = useTheme();
  const [email, setUser] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const notify = () => toast.error('Usuário e/ou Senha incorretos!', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const history = useHistory();

  function userLogin() {
    login({ email, password }).then((resp) => {
      if (resp === true) {
        history.push('/client/registry');
      }
      notify();
    });
  }

  return (
    <div>
      <Card theme={theme}>
        <Header />

        <body>
          <img src={doctor} alt="dro" />
          <div className="cardLogin">
            <img src={logo} alt="logo" className="logoMed" />
            <TextField onChange={(_, text) => setUser(text)} label="Usuário:" />
            <TextField onChange={(_, text) => setPassword(text)} label="Senha:" type="password" />
            <PrimaryButton onClick={userLogin}>
              Entrar
            </PrimaryButton>
            <img src={logoAfyados} alt="logo" className="logoAfyados" />
          </div>

          <div>
            <ToastContainer />
          </div>

        </body>
        <Footer />
      </Card>
    </div>
  );
};

export { Login };
