import React from 'react';
import { PrimaryButton } from '@fluentui/react';
import { Card } from './styles';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import doctor from '../../assests/images/doctor.png';
import logo from '../../assests/images/logo.png';
import logoAfyados from '../../assests/images/logosAfyados.png';

const Home: React.FC = () => (
  <div>
    <Card>
      <Header />
      <body>
        <img src={doctor} alt="dro" />
        <div className="cardLogin">
          <img src={logo} alt="logo" className="logoMed" />
          <p>
            A saúde do
            <br />
            seu paciente
            <br />
            é o nosso
            <br />
            propósito!
          </p>
          <img src={logoAfyados} alt="logo" className="logoAfyados" />

          <PrimaryButton className="button">
            Entrar
          </PrimaryButton>
        </div>
      </body>
    </Card>
    <Footer />

  </div>
);

export { Home };
