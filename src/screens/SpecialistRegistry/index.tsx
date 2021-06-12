import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles,
  PrimaryButton,
  Stack,
  Image,
  Text,
} from '@fluentui/react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ContextApp } from '../../context';
import { useApi } from '../../services';
import { Input } from '../../components';
import specialist from '../../assests/images/specialist.png';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ISpecialist } from '../../commonTypes';
import {
  Row,
  Column,
} from './styles';
import { Container, Panel, View } from '../../styles';
import { setData } from '../../utils';

interface ILocation{
  item?: ISpecialist
}

const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 800 } };

const SpecialistRegistry: React.FC = () => {
  const { state } = useLocation<ILocation>();
  const { user } = useContext(ContextApp);
  const api = useApi();
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
        name: Yup.string().required('O Nome é obrigatório !!'),
        phone: Yup.number().required('Ao menos um contato é obrigatório !!'),
        registry: Yup.number().required('O Registro é obrigatório !!'),
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
    try {
      if (!postcode) return;
      const { data } = await axios.get(`https://viacep.com.br/ws/${postcode}/json/`);
      formRef.current?.setFieldValue('address.city', data.localidade);
      formRef.current?.setFieldValue('address.street', data.logradouro);
      formRef.current?.setFieldValue('address.district', data.bairro);
      formRef.current?.setFieldValue('address.state', data.uf.toUpperCase());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header />
      <Form ref={formRef} onSubmit={handleSubmit} style={{ height: 'calc(100vh - 100px)' }}>
        <Panel>
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
              <Input label="Nome completo:" name="name" />
              <Input label="Email:" name="email" />
              <Scope path="address">
                <Input onBlur={handleSearch} label="CEP:" name="postcode" mask="$$.$$$-$$$" />
                <Input label="Endereço:" name="street" />
                <Stack horizontal tokens={{ childrenGap: 20, padding: 0 }}>
                  <Stack.Item grow={10}>
                    <Input label="Cidade:" name="city" />
                  </Stack.Item>
                  <Stack.Item grow={2}>
                    <Input label="Estado:" name="state" />
                  </Stack.Item>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 20, padding: 0 }}>
                  <Stack.Item grow={10}>
                    <Input label="Bairro:" name="district" />
                  </Stack.Item>
                  <Stack.Item grow={2}>
                    <Input label="Número:" name="numberOf" />
                  </Stack.Item>
                </Stack>
              </Scope>
            </Column>
            <Column style={{ justifyContent: 'flex-start' }}>
              <Stack>
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
                <PrimaryButton type="submit" style={{ marginTop: 29.04 }}>
                  Cadastrar
                </PrimaryButton>
              </Stack>
            </Column>
          </Row>
        </Panel>
      </Form>
      <Footer />
    </Container>

  );
};

export { SpecialistRegistry };
