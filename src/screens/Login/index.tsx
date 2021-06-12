import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Image, PrimaryButton, Stack, Text,
} from '@fluentui/react';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { ContextApp } from '../../context';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel, View } from '../../styles';
import { Input } from '../../components';
import doctorImage from '../../assests/images/doctor.png';
import logoImage from '../../assests/images/logo.png';
import styles from './styles';

const Login: React.FC = () => {
  const { login } = useContext(ContextApp);

  const history = useHistory();

  async function handleLogin(data: any) {
    try {
      const success = await login(data);

      if (success) {
        toast.success('Login efetuado com sucesso !!', {
          autoClose: 1000,
          onClose: () => history.push('/home'),
        });
      }
    } catch (error) {
      toast.error('Falha ao tentar fazer login');
    }
  }
  return (
    <Container>
      <Header />
      <View style={styles.boxContent}>
        <Image style={styles.imageDoctor} src={doctorImage} />
        <Form style={{ width: 650 }} onSubmit={handleLogin}>
          <Panel>
            <Image src={logoImage} />
            <Text variant="xxLargePlus">Bem vindo de volta.</Text>
            <Text variant="large">
              Para manter-se conectado, faça login com seus dados de e-mail e
              senha.
            </Text>
            <Stack style={styles.containerBox} tokens={{ childrenGap: 20 }}>
              <Input label="E-mail:" name="email" />
              <Input label="Nome completo:" name="name" />
              <PrimaryButton style={{ marginTop: 30 }} type="submit">
                enviar
              </PrimaryButton>
            </Stack>
          </Panel>
        </Form>
      </View>
      <Footer />
    </Container>
  );
};

export { Login };
