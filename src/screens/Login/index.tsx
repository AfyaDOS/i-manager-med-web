import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Image, PrimaryButton, Stack, Text,
} from '@fluentui/react';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { ContextApp } from '../../context';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel, View } from '../../styles';
import { Input } from '../../components';
import doctorImage from '../../assests/images/doctor.png';
import logoImage from '../../assests/images/logo.png';
import styles from './styles';
import { setErrors } from '../../utils';

const Login: React.FC = () => {
  const { login } = useContext(ContextApp);
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  async function handleLogin(data: any) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required('Para fazer login é necessário um e-mail.'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      const success = await login(data);

      if (success) {
        toast.success('Login efetuado com sucesso !!', {
          autoClose: 1000,
          onClose: () => history.push('/service'),
        });
      }
    } catch (error) {
      setErrors(formRef, error);
      toast.error(`Falha ao tentar fazer login, ${error?.message}`);
    }
  }
  return (
    <Container>
      <Header />
      <View style={styles.boxContent}>
        <Image style={styles.imageDoctor} src={doctorImage} />
        <Panel style={{ maxWidth: '30%', marginLeft: 'auto' }}>
          <Form ref={formRef} onSubmit={handleLogin}>
            <Image src={logoImage} width="100%" />
            <View>
              <Text variant="xxLargePlus">Bem vindo de volta.</Text>
              <Text variant="large">
                Para manter-se conectado, faça login com seus dados de e-mail e
                senha.
              </Text>
            </View>
            <Stack style={styles.containerBox} tokens={{ childrenGap: 20 }}>
              <Input
                styles={{ fieldGroup: { height: 40 } }}
                label="E-mail:"
                name="email"
                type="email"
              />
              <Input
                styles={{ fieldGroup: { height: 40 } }}
                label="Senha:"
                name="password"
                type="password"
              />
              <PrimaryButton style={styles.buttonLogin} type="submit">
                ENTRAR
              </PrimaryButton>
            </Stack>
          </Form>
        </Panel>
      </View>
      <Footer />
    </Container>
  );
};

export { Login };
