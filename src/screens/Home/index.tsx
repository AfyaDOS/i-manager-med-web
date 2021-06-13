import React from 'react';
import {
  Image, ImageFit, PrimaryButton, Text,
} from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import doctor from '../../assests/images/doctor.png';
import logoImage from '../../assests/images/logo.png';
import logoAfyados from '../../assests/images/logosAfyados.png';
import { Container, Panel, View } from '../../styles';
import styles from './styles';

const Home: React.FC = () => {
  const history = useHistory();
  return (
    <Container>
      <Header />
      <View style={styles.boxContent}>
        <Image style={styles.imageDoctor} src={doctor} />
        <Panel style={{ maxWidth: '30%', marginLeft: 'auto' }}>
          <Image src={logoImage} width="100%" />
          <Text style={styles.text} variant="xxLargePlus">A saúde do seu paciente é o nosso propósito!</Text>
          <Image imageFit={ImageFit.contain} style={styles.imageLogo} src={logoAfyados} height="40%" />
          <PrimaryButton style={styles.buttonLogin} onClick={() => history.push('/login')}>
            Entrar
          </PrimaryButton>
        </Panel>
      </View>
      <Footer />
    </Container>
  );
};

export { Home };
