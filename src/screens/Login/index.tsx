import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PrimaryButton, Text } from '@fluentui/react';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { ContextApp } from '../../context';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import 'react-toastify/dist/ReactToastify.min.css';
import { Container, Panel } from '../../styles';
import { Input } from '../../components';

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
      <Panel>
        <Form onSubmit={handleLogin}>
          <Input name="email" />
          <Input name="password" />
          <PrimaryButton>
            <Text>ENTRAR</Text>
          </PrimaryButton>
        </Form>
      </Panel>
      <Footer />
    </Container>
  );
};

export { Login };
