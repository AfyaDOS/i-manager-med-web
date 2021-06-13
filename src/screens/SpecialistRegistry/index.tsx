import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles,
  PrimaryButton,
} from '@fluentui/react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { useHistory, useLocation } from 'react-router-dom';
import { FormHandles, Scope } from '@unform/core';
import axios from 'axios';
import { useApi } from '../../services';
import { HeaderForm, Input } from '../../components';
import specialist from '../../assests/images/specialist.png';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ISpecialist } from '../../commonTypes';
import {
  Container, Panel, Row, Column, Grid,
} from '../../styles';
import { setData, setErrors } from '../../utils';

interface ILocation {
  item?: ISpecialist;
}

const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 800 }, container: { marginTop: '1em' } };

const SpecialistRegistry: React.FC = () => {
  const { state } = useLocation<ILocation>();
  const api = useApi();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [options, setOptions] = useState<IComboBoxOption[]>([]);
  const comboBoxRef = React.useRef<IComboBox>(null);

  useEffect(() => {
    setData(formRef, state?.item);
  }, [state?.item]);

  useEffect(() => {
    api.get('/specialties').then((res) => {
      setOptions(res.data);
    });
  }, []);

  async function handleSearch() {
    const postcode = formRef.current?.getFieldValue('address.postcode');
    try {
      if (!postcode) return;
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${postcode}/json/`,
      );
      formRef.current?.setFieldValue('address.city', data.localidade);
      formRef.current?.setFieldValue('address.street', data.logradouro);
      formRef.current?.setFieldValue('address.district', data.bairro);
      formRef.current?.setFieldValue('address.state', data.uf.toUpperCase());
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreate = (data: any) => {
    api
      .post(
        '/specialist',
        Object.assign(data, { specialties: comboBoxRef.current?.selectedOptions }),
      )
      .then(() => {
        toast.success('Especialista cadastrado com sucesso !!', { autoClose: 3000 });
        history.push('/specialist');
        formRef.current?.clearField('address.state');
        formRef.current?.reset();
      })
      .catch((e) => {
        toast.error(`Especialista não cadastrado !! ${e}`, { autoClose: 3000 });
      });
  };

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O Nome é obrigatório !!'),
        phone: Yup.string().required('Ao menos um contato é obrigatório !!'),
        registry: Yup.number().required('O Registro é obrigatório !!'),
        specialties: Yup.array()
          .min(1)
          .required('Você deve incluir ao menos 1 especialidade!!'),
        email: Yup.string().required('O Email é obrigatório !!'),
        address: Yup.object().shape({
          city: Yup.string().required('A Cidade é obrigatória !!'),
          state: Yup.string().required('O Estado é obrigatório !!'),
          street: Yup.string().required('O Endereço é obrigatório !!'),
          district: Yup.string().required('O Bairro é obrigatório !!'),
          numberOf: Yup.number(),
          postcode: Yup.string().required('O CEP é obrigatório !!'),
        }),
      });
      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      setErrors(formRef, error);
    }
    handleCreate(data);
  }, []);

  return (
    <Container>
      <Header />
      <Panel>
        <HeaderForm
          src={specialist}
          label="Cadastro de Especialista"
          description="Para cadastrar, preencha os campos abaixo com os dados do especialista."
        />
        <Form style={{ flex: 1 }} ref={formRef} onSubmit={handleSubmit}>
          <Row>
            <Column>
              <Input
                label="Nome completo:"
                name="name"
                placeholder="Ex: Marcelo"
              />
              <Input
                label="Email:"
                name="email"
                type="email"
                placeholder="Ex: marcelo@teste.com"
              />
              <Scope path="address">
                <Input
                  onBlur={handleSearch}
                  label="CEP:"
                  name="postcode"
                  placeholder="Ex: 88888-88"
                />
                <Input
                  label="Endereço:"
                  name="street"
                  placeholder="Ex: Rua/Av Marcelo"
                />
                <Grid templateColumns="1fr 0.5fr" gap={10}>
                  <Input
                    label="Cidade:"
                    name="city"
                    placeholder="Ex: São Paulo"
                  />
                  <Input label="Estado:" name="state" placeholder="Ex: SP" />
                </Grid>
                <Grid templateColumns="1fr 0.5fr" gap={10}>
                  <Input
                    label="Bairro:"
                    name="district"
                    placeholder="Ex: Butantã"
                  />
                  <Input
                    label="Número:"
                    name="numberOf"
                    placeholder="Ex: 888"
                  />
                </Grid>
              </Scope>
            </Column>
            <Column>
              <Input
                label="Registro:"
                name="registry"
                placeholder="Ex: 88888-88"
              />
              <Input
                label="Telefone:"
                name="phone"
                placeholder="Ex: (88) 88888-8888"
              />
              <Input
                label="Celular:"
                name="cell"
                placeholder="Ex: (88) 8888-8888"
              />
              <ComboBox
                componentRef={comboBoxRef}
                defaultSelectedKey="C"
                label="Especialidades"
                options={options}
                styles={comboBoxStyles}
                multiSelect
                placeholder="Ex: Pediatria"
              />
              <PrimaryButton type="submit" style={{ marginTop: 43 }}>
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

export { SpecialistRegistry };
