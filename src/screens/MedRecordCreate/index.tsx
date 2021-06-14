import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { PrimaryButton } from '@fluentui/react';
import { HeaderForm, Input, Select } from '../../components';
import { IClient, ISpecialist } from '../../commonTypes/index';
import { useApi } from '../../services/index';
import {
  Container,
  Panel,
  Column,
  Row,
} from '../../styles';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import descriptionIMG from '../../assests/images/description.png';
import { setData, setErrors } from '../../utils';

interface ILocation {
  item?: IClient;
}

const MedRecordCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [clients, setClients] = useState([]);
  const [specialists, setSpeclialist] = useState([]);
  const api = useApi();
  const { state } = useLocation<ILocation>();

  const history = useHistory();

  useEffect(() => {
    setData(formRef, state?.item);
  }, [state?.item]);

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

      if (state?.item) {
        await api.put(`/medrecord/update/${state?.item.id}`, { ...data });
      } else {
        await api.post('/medrecord/create', { ...data });
      }

      toast.success(
        `${
          state?.item
            ? 'Paciente atualizado com sucesso !!'
            : 'Paciente adicionado com sucesso !!'
        }`,
        {
          autoClose: 1500,
          onClose: () => history.push('/medrecord'),
        },
      );
    } catch (error) {
      setErrors(formRef, error);
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

      getClients();

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
    getSpecialists();
  }, []);

  return (
    <Container>
      <Header />
      <Panel>
        <HeaderForm
          src={descriptionIMG}
          label={
            state?.item ? 'Atualização de descriçao de consulta' : 'Adicionar descrição de consulta ao prontuário'
          }
          description="Para adicionar descrição de consulta, preencha os campos abaixo com os dados solicitados abaixo:"
        />
        <Form style={{ flex: 1 }} ref={formRef} onSubmit={handleSubmit}>
          <Row>
            <Column>
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
            <Column>
              <Input label="Descrição" name="description" multiline resizable={false} styles={{ field: { minHeight: 250 } }} />
              <PrimaryButton style={{ marginTop: 43 }} type="submit">
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

export { MedRecordCreate };
