import React, {
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  Image,
  PrimaryButton,
  Text,
} from '@fluentui/react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { useHistory, useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { useApi } from '../../services';
import { Input } from '../../components';
import specialist from '../../assests/images/user.png';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { IUser } from '../../commonTypes';
import {
  Row,
  Column,
} from './styles';
import { Container, Panel, View } from '../../styles';
import { setData } from '../../utils';

interface ILocation {
  item?: IUser
}

const UserRegistry: React.FC = () => {
  const { state } = useLocation<ILocation>();
  const api = useApi();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    setData(formRef, state?.item);
  }, [state?.item]);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O Nome é obrigatório !!'),
        password: Yup.string().required('A senha é obrigatória !!'),
        email: Yup.string().required('O Email é obrigatório !!'),
      });
      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          if (typeof error.path === 'string') {
            Object.assign(validationErrors, { [error.path]: error.message });
          }
        });
        if (typeof formRef?.current?.setErrors === 'function') {
          formRef.current.setErrors(validationErrors);
        }
      }
    }
    api.post('/users', {
      name: formRef.current?.getFieldValue('name'),
      email: formRef.current?.getFieldValue('email'),
      password: formRef.current?.getFieldValue('password'),

    }).then(() => {
      toast.success('Usuário cadastrado com sucesso !!', { autoClose: 3000 });
      history.push('/user');
      formRef.current?.reset();
    })
      .catch((e) => {
        toast.error(`Usuário não cadastrado !! ${e}`, { autoClose: 3000 });
        // onClose: () => history.go(0),
        // formRef.current?.reset();
      });
  }, []);

  return (
    <Container>
      <Header />
      <Panel>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Image src={specialist} width={60} />
              <View style={{ marginLeft: 20 }}>
                <Text variant="xxLarge">Cadastro de Especialista</Text>
                <Text>
                  Para cadastrar, preencha os campos abaixo com os dados do
                  especialista.
                </Text>
              </View>
            </View>
          </View>
          <Row>
            <Column style={{ justifyContent: 'flex-start' }}>
              <Input label="Nome completo:" name="name" placeholder="Ex: Marcelo" />
              <Input label="Email:" name="email" placeholder="Ex: marcelo@teste.com" />
              <Input label="Senha:" name="password" placeholder="Ex: ***" />
              <PrimaryButton type="submit" style={{ marginTop: 29.04 }}>
                Cadastrar
              </PrimaryButton>
            </Column>
          </Row>

        </Form>
      </Panel>
      <Footer />
    </Container>

  );
};

export { UserRegistry };
