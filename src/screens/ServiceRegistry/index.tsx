import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { IDropdownOption, PrimaryButton } from '@fluentui/react';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import {
  HeaderForm, Input, Select, UnformDatePicker,
} from '../../components';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import {
  Container, Panel, Row, Column,
} from '../../styles';
import serviceImage from '../../assests/images/service.png';
import { DayPickerStrings, setData, setErrors } from '../../utils';
import {
  IClient,
  IServiceState,
  EServiceState,
  ISpecialist,
} from '../../commonTypes';
import { useApi } from '../../services';

interface ILocation {
  item?: IClient;
}

const ServiceRegistry: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { state } = useLocation<ILocation>();
  const [serviceState, setServiceState] = useState<IDropdownOption[]>([]);
  const [clients, setClients] = useState<IDropdownOption[]>([]);
  const [specialists, setSpecialists] = useState<IDropdownOption[]>([]);
  const api = useApi();
  const history = useHistory();

  const getBloodTypes = useCallback(async () => {
    try {
      const { data } = await api.get('/servicestate');

      if (data) {
        setServiceState(
          data.map((stateService: IServiceState) => ({
            key: stateService.id,
            text: EServiceState[Number(stateService.state)],
          })),
        );
      }
    } catch (error) {
      toast.error('Erro ao tentar se connectar com o servidor ');
    }
  }, []);

  const getClients = useCallback(async () => {
    try {
      const { data } = await api.get('/clients');

      if (data) {
        setClients(
          data.map((client: IClient) => ({
            key: client.id,
            text: client.name,
          })),
        );
      }
    } catch (error) {
      toast.error('Erro ao tentar se connectar com o servidor ');
    }
  }, []);

  const getSpecialist = useCallback(async () => {
    try {
      const { data } = await api.get('/specialist');

      if (data) {
        setSpecialists(
          data.map((specialist: ISpecialist) => ({
            key: specialist.id,
            text: `${specialist.name} - Especialidades: ${specialist.specialties
              .map((speciality) => speciality.text)
              .join(' - ')}`,
          })),
        );
      }
    } catch (error) {
      toast.error('Erro ao tentar se connectar com o servidor ');
    }
  }, []);

  useEffect(() => {
    getBloodTypes();
    getClients();
    getSpecialist();
  }, []);

  useEffect(() => {
    setData(formRef, state?.item);
  }, [state?.item]);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        client: Yup.string().required('O cliente é obrigatório !!'),
        specialist: Yup.string().required('O especialista é obrigatório !!'),
        serviceState: Yup.string().required('O especialista é obrigatório !!'),
        scheduleDate: Yup.string().required(
          'A data de agendamento é obrigatória !!',
        ),
        scheduleTime: Yup.string().required(
          'A hora de agendamento é obrigatória !!',
        ),
      });

      const service = {
        client: data.client,
        specialist: data.specialist,
        scheduleDate: new Date(
          data.scheduleDate.getFullYear(),
          data.scheduleDate.getMonth(),
          data.scheduleDate.getDate(),
          data.scheduleTime.split(':')[0],
          data.scheduleTime.split(':')[1],
        ),
      };

      await schema.validate(data, { abortEarly: false });

      if (state?.item) {
        await api.put(`/services/${state?.item.id}`, { ...data });
      } else {
        await api.post('/services', { ...service });
      }

      toast.success(
        `${
          state?.item
            ? 'Consulta atualizada com sucesso !!'
            : 'Consulta adicionada com sucesso !!'
        }`,
        {
          autoClose: 1500,
          onClose: () => history.push('/service'),
        },
      );
    } catch (error) {
      console.log(error);
      setErrors(formRef, error);
      toast.error('Ops.. Ocoreu algum erro ao tentar registrar a consulta.');
    }
  }, []);

  return (
    <Container>
      <Header />
      <Panel>
        <HeaderForm
          src={serviceImage}
          label={
            state?.item ? 'Atualização de Consulta' : 'Cadastro de Consulta'
          }
          description="Para cadastrar, preencha os campos abaixo com os dados da consulta."
        />
        <Form style={{ flex: 1 }} ref={formRef} onSubmit={handleSubmit}>
          <Row>
            <Column>
              <Select name="client" label="Paciente" options={clients} />
              <Select
                name="specialist"
                label="Especialista:"
                options={specialists}
              />
              <Select
                name="serviceState"
                label="Status do atendimento:"
                options={serviceState}
              />
              <UnformDatePicker
                formatDate={(date) => (date ? date.toLocaleDateString('pt-BR') : '')}
                minDate={new Date()}
                strings={DayPickerStrings}
                name="scheduleDate"
                label="Data da consulta:"
              />
              <Input
                name="scheduleTime"
                label="Hora da consulta:"
                type="time"
              />
              {state?.item && (
                <UnformDatePicker
                  formatDate={(date) => (date ? date.toLocaleDateString('pt-BR') : '')}
                  minDate={new Date()}
                  strings={DayPickerStrings}
                  name="serviceDate"
                  label="Data do atendimento:"
                />
              )}
            </Column>
            <PrimaryButton style={{ marginTop: 43 }} type="submit">
              {state?.item ? 'ATUALIZAR' : 'ENVIAR'}
            </PrimaryButton>
          </Row>
        </Form>
      </Panel>
      <Footer />
    </Container>
  );
};

export { ServiceRegistry };
