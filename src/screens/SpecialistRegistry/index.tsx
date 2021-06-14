import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
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
import { Row, Column } from './styles';
import { Container, Panel } from '../../styles';
import { setData } from '../../utils';

interface ILocation {
  item?: ISpecialist
}

const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 800 } };

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
      const { data } = await axios.get(`https://viacep.com.br/ws/${postcode}/json/`);
      formRef.current?.setFieldValue('address.city', data.localidade);
      formRef.current?.setFieldValue('address.street', data.logradouro);
      formRef.current?.setFieldValue('address.district', data.bairro);
      formRef.current?.setFieldValue('address.state', data.uf.toUpperCase());
    } catch (error) {
      toast.error('Ocoreu um erro ao tentar buscar o cep !');
    }
  }

  const handleCreate = async (data: any) => {
    Object.assign(data.address, { id: state?.item?.address.id });
    Object.assign(data, { specialties: comboBoxRef.current?.selectedOptions });
    if (state?.item) {
      api.put(`/specialist/${state?.item.id}`, data).then(() => {
        toast.success('Especialista editado com sucesso !!', { autoClose: 3000 });
        history.push('/specialist');
        formRef.current?.clearField('address.state');
        formRef.current?.reset();
      })
        .catch((e) => {
          toast.error(`Especialista não editado !! ${e}`, { autoClose: 3000 });
        });
    } else {
      api.post('/specialist', Object.assign(data, { specialties: comboBoxRef.current?.selectedOptions })).then(() => {
        toast.success('Especialista cadastrado com sucesso !!', { autoClose: 3000 });
        history.push('/specialist');
        formRef.current?.clearField('address.state');
        formRef.current?.reset();
      })
        .catch((e) => {
          toast.error(`Especialista não cadastrado !! ${e}`, { autoClose: 3000 });
        });
    }
  };

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O Nome é obrigatório !!'),
        phone: Yup.number(),
        cell: Yup.number().required('O Celular é obrigatório !!'),
        registry: Yup.number().required('O Registro é obrigatório !!'),
        specialties: Yup.array().min(1).required('Você deve incluir ao menos 1 especialidade!!'),
        email: Yup.string().required('O Email é obrigatório !!'),
        address: Yup.object().shape({
          city: Yup.string().required('A Cidade é obrigatória !!'),
          state: Yup.string().required('O Estado é obrigatório !!'),
          street: Yup.string().required('O Endereço é obrigatório !!'),
          district: Yup.string().required('O Bairro é obrigatório !!'),
          numberOf: Yup.number().required('O Número é obrigatório !!'),
          postcode: Yup.string().required('O CEP é obrigatório !!'),
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
    handleCreate(data);
  }, []);

  return (
    <Container>
      <Header />
      <Panel>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <HeaderForm src={specialist} label={state?.item ? 'Atualização de Especialista' : 'Cadastro de Especialista'} description="Para cadastrar um Especialista preencha os campos abaixo." />
          <Row>
            <Column style={{ justifyContent: 'flex-start' }}>
              <Input label="Nome completo:" name="name" placeholder="Ex: Marcelo" />
              <Input label="Email:" name="email" type="email" placeholder="Ex: marcelo@teste.com" />
              <Scope path="address">
                <Input onBlur={handleSearch} label="CEP:" numeric mask="$$$$$-$$$" name="postcode" placeholder="Ex: 88888-88" />
                <Input label="Endereço:" name="street" placeholder="Ex: Rua/Av Marcelo" />
                <Stack horizontal tokens={{ childrenGap: 20, padding: 0 }}>
                  <Stack.Item grow={10}>
                    <Input label="Cidade:" name="city" placeholder="Ex: São Paulo" />
                  </Stack.Item>
                  <Stack.Item grow={2}>
                    <Input label="Estado:" name="state" placeholder="Ex: SP" />
                  </Stack.Item>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 20, padding: 0 }}>
                  <Stack.Item grow={10}>
                    <Input label="Bairro:" name="district" placeholder="Ex: Butantã" />
                  </Stack.Item>
                  <Stack.Item grow={2}>
                    <Input label="Número:" name="numberOf" placeholder="Ex: 888" />
                  </Stack.Item>
                </Stack>
              </Scope>
            </Column>
            <Column style={{ justifyContent: 'flex-start' }}>
              <Input label="Registro:" name="registry" numeric mask="$$$$$$-$$" placeholder="Ex: 88888-88" />
              <Input label="Telefone:" name="phone" numeric mask="($$) $$$$-$$$$" placeholder="Ex: (88) 88888-8888" />
              <Input label="Celular:" name="cell" numeric mask="($$) $$$$$-$$$$" placeholder="Ex: (88) 8888-8888" />
              <ComboBox
                componentRef={comboBoxRef}
                defaultSelectedKey="C"
                label="Especialidades"
                options={options}
                styles={comboBoxStyles}
                multiSelect
                placeholder="Ex: Pediatria"
                style={{ marginTop: 14 }}
              />
              <PrimaryButton type="submit" style={{ marginTop: 43.04 }}>
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
