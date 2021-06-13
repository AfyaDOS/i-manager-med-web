import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { PrimaryButton, Image, Text } from '@fluentui/react';
// import { useHistory } from 'react-router-dom';
import { Input, Select } from '../../components';
import { IClient, ISpecialist } from '../../commonTypes/index';
import { useApi } from '../../services/index';
import { Container, Panel, View } from '../../styles';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import descriptionIMG from '../../assests/images/description.png';
import { Row, Column } from './styles';

const MedRecordCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clients, setClients] = useState([]);
  const [specialists, setSpeclialist] = useState([]);
  const api = useApi();
  // const history = useHistory();

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        client: Yup.string().required('O nome do paciente é obrigatório !!'),
        specialist: Yup.string().required(
          'O nome do especialista é obrigatório !!',
        ),
        description: Yup.string().required('A descrição é obrigatória !!'),
      });

      await schema.validate(data, { abortEarly: false });
      await api.post('/medrecord/create', { ...data });
    } catch (err) {
      console.log(err);
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

  const getClients = useCallback(async () => {
    try {
      const { data } = await api.get('/clients');

      if (data) {
        setClients(
          data.map((item: IClient) => ({
            key: item.id,
            text: item.name,
          })),
        );
      }
    } catch (error) {
      toast.error('Erro ao obter a lista de clientes');
    }
  }, []);

  const getSpecialists = useCallback(async () => {
    try {
      const { data } = await api.get('/specialist');

      if (data) {
        setSpeclialist(
          data.map((item: ISpecialist) => ({
            key: item.id,
            text: item.name,
          })),
        );
      }
    } catch (error) {
      toast.error('Erro ao obter a lista de especialistas');
    }
  }, []);

  useEffect(() => {
    getClients();
    getSpecialists();
  }, []);

  return (
    <Container>
      <Header />

      <Panel>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Image src={descriptionIMG} width={60} />
              <View style={{ marginLeft: 20 }}>
                <Text variant="xxLarge">Criar descrição de Consulta</Text>
                <Text>
                  Para adicionar uma consulta no prontuário, preencha os campos
                  abaixo com os dados:
                </Text>
              </View>
            </View>
          </View>
          <Row>
            <Column style={{ justifyContent: 'flex-start' }}>
              <Select
                name="client"
                label="Nome do paciente:"
                options={clients}
              />
              <Select
                name="specialist"
                label="Nome do especialista:"
                options={specialists}
              />
            </Column>
            <Column style={{ justifyContent: 'flex-start' }}>
              <Input label="Descrição" name="description" multiline resizable={false} styles={{ field: { minHeight: 300 } }} />
              <PrimaryButton type="submit" style={{ marginTop: 29.04 }}>
                Criar
              </PrimaryButton>
            </Column>
          </Row>
        </Form>
      </Panel>

      <Footer />
    </Container>
  );
};

export { MedRecordCreate };
