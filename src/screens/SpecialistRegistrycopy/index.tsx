import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles,
  PrimaryButton,
  Stack,
} from '@fluentui/react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import axios from 'axios';
import api from '../../services';
import { Input } from '../../components';
import { Card, CardUser } from './styles';
import specialist from '../../assests/images/specialist.png';
import { Header } from '../../components/Header';

const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 800 } };
const SpecialistRegistry: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [options, setOptions] = useState<IComboBoxOption[]>([]);
  const comboBoxRef = React.useRef<IComboBox>(null);
  const headers = {
    Authorization:
      ',eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2Y2FlNTJkLTkzNGMtNDk5MS05NDU3LTk3Njg4ZTg3YWI0YiIsIm5hbWUiOiJtYXJjZWxvIiwiaWF0IjoxNjIzMzM3NjYzLCJleHAiOjE2MjM0MjQwNjN9.NwVN8igJcuVptJxCqCd-Pyof7hhzk85hkRQxkImmswA',
  };
  useEffect(() => {
    api.get('/specialties', { headers }).then((res) => {
      setOptions(res.data);
    });
  }, []);
  // @ts-ignore
  const getSpecialist: any[] = [];
  function specialties(value: any) {
    if (value?.selected === true) {
      getSpecialist.push(value);
    }
    console.log(getSpecialist);
  }

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        registry: Yup.number().required('O Registro é obrigatório !!'),
        name: Yup.string().required('O Nome é obrigatório !!'),
        phone: Yup.number().required('Ao menos um contato é obrigatório !!'),
        specialties: Yup.array().min(1).required('Você deve incluir ao menos 1 especialidade!!'),
        email: Yup.string().required('O Email é obrigatório !!'),
        address: Yup.object().shape({
          city: Yup.string().required('A Cidade é obrigatória !!'),
          state: Yup.string().required('O Estado é obrigatório !!'),
          street: Yup.string().required('O Endereço é obrigatório !!'),
          district: Yup.string().required('O Bairro é obrigatório !!'),
          numberOf: Yup.number(),
          postcode: Yup.number().required('O CEP é obrigatório !!'),
        }),
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
  }, []);
  async function handleSearch() {
    const postcode = formRef.current?.getFieldValue('address.postcode');
    console.log(postcode);
    try {
      if (!postcode) return;
      const { data } = await axios.get(`https://viacep.com.br/ws/${postcode}/json/`);
      console.log(data);
      if (data?.error) {
        throw new Error('CEP invalido.');
      }
      formRef.current?.setFieldValue('address.city', data.localidade);
      formRef.current?.setFieldValue('address.street', data.logradouro);
      formRef.current?.setFieldValue('address.district', data.bairro);
      formRef.current?.setFieldValue('address.state', data.uf.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <Header />
      <CardUser>
        <div className="title">
          <div>
            <img src={specialist} alt="logo especialista" className="logo" />
          </div>
          <div className="textCardHeader">
            <h1>Cadastro de Especialista</h1>
            <p>
              Para cadastrar, preencha os campos abaixo com os dados do
              especialista.
            </p>
          </div>
        </div>

        <Form ref={formRef} onSubmit={handleSubmit} className="form">
          <Stack className="textColumn">
            <Input label="Nome completo:" name="name" />
            <Input label="Email:" name="email" />
            <Scope path="address">
              <Input onBlur={handleSearch} label="CEP:" name="postcode" mask="$$.$$$-$$$" />
              <Input label="Endereço:" name="street" />
              <Stack horizontal tokens={{ childrenGap: 20, padding: 0 }}>
                <Stack.Item grow={9}>
                  <Input label="Cidade:" name="city" />
                </Stack.Item>
                <Stack.Item grow={3}>
                  <Input label="Estado:" name="state" />
                </Stack.Item>
              </Stack>
              <Stack horizontal tokens={{ childrenGap: 20, padding: 0 }}>
                <Stack.Item grow={9}>
                  <Input label="Bairro:" name="district" />
                </Stack.Item>
                <Stack.Item grow={3}>
                  <Input label="Número:" name="numberOf" />
                </Stack.Item>
              </Stack>
            </Scope>
          </Stack>
          <Stack className="separator" />
          <Stack className="textColumn">
            <Input label="Registro:" name="registry" />
            <Input label="Telefone:" name="phone" />
            <Input label="Celular:" name="phone" />
            <ComboBox
              componentRef={comboBoxRef}
              defaultSelectedKey="C"
              label="Especialidades"
              options={options}
              styles={comboBoxStyles}
              multiSelect
              onChange={(i, value) => specialties(value)}
            />
            <PrimaryButton type="submit" className="button">
              Cadastrar
            </PrimaryButton>
          </Stack>
        </Form>
      </CardUser>
    </Card>
  );
};

export { SpecialistRegistry };
