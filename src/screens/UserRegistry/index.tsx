import React, {
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { PrimaryButton } from '@fluentui/react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { useHistory, useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { useApi } from '../../services';
import { HeaderForm, Input } from '../../components';
import specialist from '../../assests/images/user.png';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { IUser } from '../../commonTypes';
import {
  Row,
  Column,
} from './styles';
import { Container, Panel } from '../../styles';
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

  const handleSubmit = useCallback(async (data: Record<string, string>) => {
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

    if (state?.item) {
      formRef.current?.setFieldValue('password', '');
      api.put(`/users/${state?.item.id}`, { ...data }).then(() => {
        toast.success('Usuário cadastrado com sucesso !!', { autoClose: 3000 });
        history.push('/user');
        formRef.current?.reset();
      })
        .catch((e) => {
          toast.error(`Usuário não cadastrado !! ${e}`, { autoClose: 3000 });
        });
    } else {
      api.post('/users', { ...data }).then(() => {
        toast.success('Usuário cadastrado com sucesso !!', { autoClose: 3000 });
        history.push('/user');
        formRef.current?.reset();
      })
        .catch((e) => {
          toast.error(`Usuário não cadastrado !! ${e}`, { autoClose: 3000 });
        });
    }
  }, []);

  return (
    <Container>
      <Header />
      <Panel>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <HeaderForm
            src={specialist}
            label={state?.item ? 'Atualização de Usuário' : 'Cadastro de Usuário'}
            description="Para cadastrar, preencha os campos abaixo com os dados do
                  Usuário."
          />
          <Row>
            <Column style={{ justifyContent: 'flex-start' }}>
              <Input label="Nome completo:" type="text" name="name" placeholder="Ex: Marcelo" />
              <Input label="Email:" name="email" type="email" placeholder="Ex: marcelo@teste.com" />
              <Input label="Senha:" name="password" type="password" placeholder="Ex: ***" />
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
