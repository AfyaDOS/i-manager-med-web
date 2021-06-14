import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';
import { IDropdownOption, PrimaryButton } from '@fluentui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { HeaderForm, Input, Select } from '../../components';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import {
  Container, Grid, Panel, Row, Column,
} from '../../styles';
import imageHeader from '../../assests/images/patients.png';
import { setData, setErrors, states } from '../../utils';
import { IClient, IBloodType, EBloodTypes } from '../../commonTypes';
import { useApi } from '../../services';

interface ILocation {
  item?: IClient;
}

const ClientsRegister: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { state } = useLocation<ILocation>();
  const [bloodTypes, setBloodTypes] = useState<IDropdownOption[]>([]);
  const api = useApi();
  const history = useHistory();
  const [gendersType] = useState<IDropdownOption[]>([
    { key: '0', text: 'Masculino' },
    { key: '1', text: 'Feminino' },
    { key: '2', text: 'Outros' },
  ]);

  const getBloodTypes = useCallback(async () => {
    try {
      const { data } = await api.get('/bloodtype/all');

      if (data) {
        setBloodTypes(
          data.map((bloodtype: IBloodType) => ({
            key: bloodtype.id,
            text: EBloodTypes[Number(bloodtype.typeOf)],
          })),
        );
      }
    } catch (error) {
      toast.error('Erro ao tentar se connectar com o servidor ');
    }
  }, []);

  useEffect(() => {
    getBloodTypes();
  }, []);

  useEffect(() => {
    setData(formRef, state?.item);
  }, [state?.item]);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        cpf: Yup.string()
          .min(11, 'CPF deve conter minimo de 11 digitos.')
          .max(11, 'CPF deve conter maximo de 11 digitos.')
          .required('O CPF é obrigatório !!'),
        name: Yup.string().required('O nome é obrigatório !!'),
        phone: Yup.string(),
        cellphone: Yup.string().required(
          'Ao menos um contato é obrigatório !!',
        ),
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

      if (state?.item) {
        await api.put(`/clients/${state?.item.id}`, { ...data });
      } else {
        await api.post('/clients', { ...data });
      }

      toast.success(
        `${
          state?.item
            ? 'Paciente atualizado com sucesso !!'
            : 'Paciente adicionado com sucesso !!'
        }`,
        {
          autoClose: 1500,
          onClose: () => history.push('/client'),
        },
      );
    } catch (error) {
      setErrors(formRef, error);
    }
  }, []);

  async function handleSearch() {
    const postcode = formRef.current?.getFieldValue('address.postcode');

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
      <Panel>
        <HeaderForm
          src={imageHeader}
          label={
            state?.item ? 'Atualização de Paciente' : 'Cadastro de Pacientes'
          }
          description="Para cadastrar, preencha os campos abaixo com os dados do paciente."
        />
        <Form style={{ flex: 1 }} ref={formRef} onSubmit={handleSubmit}>
          <Row>
            <Column>
              <Input numeric label="CPF:" name="cpf" mask="$$$.$$$.$$$-$$" />
              <Input label="Nome completo:" name="name" />
              <Scope path="address">
                <Input
                  numeric
                  onBlur={handleSearch}
                  label="CEP:"
                  name="postcode"
                  mask="$$.$$$-$$$"
                />
                <Grid templateColumns="1fr 0.5fr" gap={10}>
                  <Input label="Rua:" name="street" />
                  <Input label="Número:" name="numberOf" />
                </Grid>
                <Grid templateColumns="1fr 0.5fr" gap={10}>
                  <Input label="Cidade:" name="city" />
                  <Select options={states} name="state" label="Estado:" />
                </Grid>
                <Input label="Bairro:" name="district" />
              </Scope>
            </Column>
            <Column>
              <Input
                numeric
                label="Telefone:"
                name="phone"
                mask="($$) $$$$-$$$$"
              />
              <Input
                numeric
                label="Celular:"
                name="cellphone"
                mask="($$) $.$$$$-$$$$"
              />
              <Input label="Email:" name="email" type="email" />
              <Select
                options={bloodTypes}
                name="bloodtype"
                label="Tipo Sanguíneo:"
              />
              <Select options={gendersType} name="gender" label="Sexo:" />
              <PrimaryButton style={{ marginTop: 34 }} type="submit">
                {state?.item ? 'ATUALIZAR' : 'ENVIAR'}
              </PrimaryButton>
            </Column>
          </Row>
        </Form>
      </Panel>
      <Footer />
    </Container>
  );
};

export { ClientsRegister };
