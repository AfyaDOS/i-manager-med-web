import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';
import {
  IDropdownOption,
  Image,
  PrimaryButton,
  Stack,
  Text,
} from '@fluentui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Input, Select } from '../../components';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel, View } from '../../styles';
import { Row, Column } from './styles';
import imageHeader from '../../assests/images/patients.png';
import { states } from '../../utils';

const bloodtype = [{
  key: 'sdasdasdasd',
  text: 'A+',
}];

const ClientsRegister: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [gendersType] = useState<IDropdownOption[]>([
    { key: '0', text: 'Masculino' },
    { key: '1', text: 'Feminino' },
    { key: '2', text: 'Outros' },
  ]);

  useEffect(() => {
    if (formRef.current) {
      const data = {
        cpf: '11111111111',
        name: 'leonardo',
        phone: '1111111111',
        cellphone: '11111111111',
        email: 'teste@teste.com',
        bloodtype: 'sdasdasdasd',
        gender: '0',
        address: {
          postcode: '17512270', street: 'Rua Bento de Abreu Filho', numberOf: '2221', city: 'Marília', state: 'sp', district: 'Jardim Santa Antonieta',
        },
      };

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formRef.current?.setFieldValue(`${key}.${subKey}`, subValue);
          });
        }
        formRef.current?.setFieldValue(key, value);
      });
    }
  }, []);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        cpf: Yup.string()
          .min(11, 'CPF deve conter minimo de 11 digitos.')
          .max(11, 'CPF deve conter maximo de 11 digitos.'),
        name: Yup.string().required('O nome é obrigatório !!'),
        phone: Yup.string(),
        cellphone: Yup.string().required('Ao menos um contato é obrigatório !!'),
        bloodtype: Yup.string().required('Tipo sanguíneo é obrigatório !!'),
        email: Yup.string().required('O email é obrigatório !!'),
        gender: Yup.string().required('O genero é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string().required('Acidade é obrigatório !!'),
          state: Yup.string().required('O estado é obrigatório !!'),
          street: Yup.string().required('A rua é obrigatório !!'),
          district: Yup.string().required('O Bairro é obrigatório !!'),
          numberOf: Yup.string(),
          postcode: Yup.string().required('CEP é obrigatório !!'),
        }),
      });

      await schema.validate(data, { abortEarly: false });

      console.log(JSON.stringify(data));
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

      const { data } = await axios.get(
        `https://viacep.com.br/ws/${postcode}/json/`,
      );

      formRef.current?.clearField('address.state');

      if (data?.erro) {
        formRef.current?.setFieldError('address.postcode', 'CEP inválido !!');
      }

      formRef.current?.setFieldValue('address.city', data.localidade);
      formRef.current?.setFieldValue('address.street', data.logradouro);
      formRef.current?.setFieldValue('address.district', data.bairro);
      formRef.current?.setFieldValue('address.state', data.uf.toLowerCase());
    } catch (error) {
      toast.error('Falha ao obter o cep');
    }
  }

  return (
    <Container>
      <Header />
      <Form
        style={{ height: 'calc(100% - 100px)' }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Panel>
          <View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image src={imageHeader} width={60} />
              <View style={{ marginLeft: 20 }}>
                <Text variant="xxLarge">Cadastro de Pacientes</Text>
                <Text>
                  Para cadastrar, preencha os campos abaixo com os dados do
                  paciente.
                </Text>
              </View>
            </View>
          </View>
          <Row>
            <Column>
              <Input
                label="CPF:"
                name="cpf"
                type="number"
                mask="$$$.$$$.$$$-$$"
              />
              <Input label="Nome completo:" name="name" />
              <Scope path="address">
                <Input
                  onBlur={handleSearch}
                  label="CEP:"
                  type="number"
                  name="postcode"
                  mask="$$.$$$-$$$"
                />
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                  <Stack.Item grow={10}>
                    <Input label="Rua:" name="street" />
                  </Stack.Item>
                  <Stack.Item grow={2}>
                    <Input label="Número:" name="numberOf" />
                  </Stack.Item>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                  <Stack.Item grow={6}>
                    <Input label="Cidade:" name="city" />
                  </Stack.Item>
                  <Stack.Item grow={6}>
                    <Select options={states} name="state" label="Estado:" />
                  </Stack.Item>
                </Stack>
                <Input label="Bairro:" name="district" />
              </Scope>
            </Column>
            <Column>
              <Input
                label="Telefone:"
                type="number"
                name="phone"
                mask="($$) $$$$-$$$$"
              />
              <Input
                label="Celular:"
                type="number"
                name="cellphone"
                mask="($$) $.$$$$-$$$$"
              />
              <Input label="Email:" name="email" />
              <Select options={bloodtype} name="bloodtype" label="Tipo Sanguíneo:" />
              <Select options={gendersType} name="gender" label="Sexo:" />
              <PrimaryButton style={{ marginTop: 30 }} type="submit">
                enviar
              </PrimaryButton>

              <PrimaryButton style={{ marginTop: 30 }} type="button" onClick={() => formRef.current?.reset()}>
                enviar
              </PrimaryButton>
            </Column>
          </Row>
        </Panel>
      </Form>
      <Footer />
    </Container>
  );
};

export { ClientsRegister };
