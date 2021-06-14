import React, { useCallback, useEffect, useState } from 'react';
import {
  CommandBar,
  DatePicker,
  ICommandBarItemProps,
  SearchBox,
} from '@fluentui/react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel } from '../../styles';
import serviceImg from '../../assests/images/service.png';
import { useApi } from '../../services/index';
import { IService } from '../../commonTypes';
import { FlatList, IColumns } from '../../components/FlatList';
import { Dialog } from '../../utils';
import { HeaderForm } from '../../components';

const Services: React.FC = () => {
  const [services, setServices] = useState<IService[]>();
  const [servicesList, setServicesList] = useState<Array<any>>();
  const [backupServices, setBackupServices] = useState<any[]>([]);
  const api = useApi();
  const history = useHistory();
  const [selected, setSelected] = useState<string | undefined>();
  const [selectesDate, setSelectedDate] = useState(new Date());

  console.log(services);

  const getServices = useCallback(async (date?: Date) => {
    try {
      const { data } = await api.get('/services', { params: { date: date?.toLocaleDateString('pt-BR') || selectesDate } });

      if (data) {
        const newDateList = data.map((service: IService) => ({
          id: service.id,
          name: service.client.name,
          specialist: service.specialist.name,
          scheduleDate: new Date(service.scheduleDate).toLocaleDateString(
            'pt-BR',
          ),
          timeSchedule: new Date(service.scheduleDate).toLocaleTimeString(
            'pt-BR',
            { hour: '2-digit', minute: '2-digit' },
          ),
        }));
        setServices(data);
        setServicesList(newDateList);
        setBackupServices(newDateList);
      }
    } catch (error) {
      console.log(error);
      toast.error('Erro ao obter a lista de atendimentos');
    }
  }, []);

  const columns: IColumns[] = [
    {
      fieldName: 'name',
      key: 'name',
      name: 'Paciente',
      maxWidth: 200,
    },
    {
      fieldName: 'specialist',
      key: 'specialist',
      name: 'Especialista',
      maxWidth: 200,
    },
    {
      fieldName: 'scheduleDate',
      key: 'scheduleDate',
      name: 'Date de Agendamento',
      maxWidth: 250,
    },
    {
      fieldName: 'timeSchedule',
      key: 'timeSchedule',
      name: 'Hora de Agendamento',
      maxWidth: 250,
    },
  ];

  async function handleDelete() {
    try {
      if (!selected) {
        toast.warn('Você precisa selecionar um paciente !!');
        return;
      }

      Dialog.show({
        title: 'Deletar paciente',
        subText: 'Tem certeza que deseja o paciente ?',
        positive: async () => {
          await api.delete(`/clients/${selected}`);

          getServices();
        },
      });
    } catch (error) {
      toast.error('Um erro ocoreu ao tentar deletar o paciente');
    }
  }

  function handleEdit() {
    if (selected) {
      Dialog.show({
        title: 'Edição de dados',
        subText: 'Tem certeza que deseja editar os dados do paciente ?',
        positive: () => history.push('/client/registry', { item: servicesList?.filter((client) => client.id === selected)[0] }),
      });
    }
  }

  function handleFilter(text?: string) {
    setServicesList(
      backupServices.filter((service) => {
        if (
          service.name
            .toLowerCase()
            .includes(String(text?.toLowerCase()))
            || service.specialist
              .toLowerCase()
              .includes(String(text?.toLowerCase()))
        ) {
          return true;
        }
        return false;
      }),
    );

    if (text === '') setServices(backupServices);
  }

  const renderSearch = () => (
    <SearchBox
      styles={{ root: { minWidth: 300, width: 300 } }}
      placeholder="Filtrar consultas, ex: Nome,  Especialistas"
      onChange={(_, text) => handleFilter(text)}
    />
  );

  useEffect(() => {
    getServices();
  }, []);

  function handleChangeDate(date?: Date | null) {
    if (date) {
      getServices(date);
      setSelectedDate(date);
    }
  }

  const renderDate = () => (
    <DatePicker
      styles={{ root: { height: 32 } }}
      value={selectesDate}
      onSelectDate={handleChangeDate}
      placeholder="Selecione uma data..."
      formatDate={(date) => (date ? date.toLocaleDateString('pt-BR') : '')}
    />
  );

  const commandBarBtn: ICommandBarItemProps[] = [
    {
      key: 'date',
      onRenderIcon: renderDate,
    },
    {
      key: 'search',
      onRenderIcon: renderSearch,
    },
    {
      key: 'add',
      text: 'Adicionar',
      split: true,
      iconProps: { iconName: 'Add' },
      onClick: () => history.push('/service/registry'),
    },
    {
      key: 'excluir',
      text: 'Excluir',
      split: true,
      iconProps: {
        iconName: 'Delete',
        styles: { root: { color: 'red' } },
      },
      onClick: () => {
        handleDelete();
      },
    },
    {
      key: 'edit',
      text: 'Editar',
      split: true,
      iconProps: { iconName: 'Edit' },
      onClick: handleEdit,
    },
  ];

  return (
    <Container>
      <Header />
      <Panel>
        <HeaderForm
          src={serviceImg}
          label="Consultas"
          description="Aqui estão as consultas."
        />
        <CommandBar items={commandBarBtn} />
        <FlatList
          columns={columns}
          data={servicesList}
          setSelection={(id) => setSelected((prev) => (id === prev ? undefined : id))}
        />
      </Panel>
      <Footer />
    </Container>
  );
};

export { Services };
