import React, {
  useEffect, useState, useCallback, useRef,
} from 'react';
import {
  CommandBar,
  ICommandBarItemProps,
  Dropdown,
  IDropdownOption,
} from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Header, Footer, HeaderForm, ModalPreview,
} from '../../components';
import { Container, Panel } from '../../styles';
import medRecordImg from '../../assests/images/med-record.png';
import { useApi } from '../../services/index';
import { IMedRecord, IClient } from '../../commonTypes/index';
import { FlatList, IColumns } from '../../components/FlatList';
import { Dialog } from '../../utils';
import { HandleModal } from '../../components/ModalPreview';

const MedRecordHistory: React.FC = () => {
  const api = useApi();
  const history = useHistory();
  const [records, setRecords] = useState<IMedRecord[]>([]);
  const [listRecords, setListRecords] = useState<IMedRecord[]>([]);
  const [listRecordsDefault, setListRecordsDefault] = useState<IMedRecord[]>([]);
  const [selected, setSelected] = useState<string | undefined>();
  const [clients, setClients] = useState([]);
  const refModal = useRef<HandleModal>(null);

  const loadMedRecords = useCallback(async (item?: IDropdownOption) => {
    try {
      const { data } = await api.get(`/medrecord/get/${item?.key}`);
      if (data) {
        setRecords(data);
        setListRecordsDefault(
          data.map((record: IMedRecord) => ({
            id: record.id,
            client: record.client.id,
            specialist: record.specialist.id,
            description: record.description,
          })),
        );
        setListRecords(
          data.map((record: IMedRecord) => ({
            clientName: record.client.name,
            specialistName: record.specialist.name,
            description: record.description,
            date: new Date(record.created_at).toLocaleDateString('pt-BR'),
            time: new Date(record.created_at).toLocaleTimeString('pt-BR'),
            id: record.id,
          })),
        );
      }
    } catch (error) {
      toast.error('Erro ao obter o prontuário');
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

  useEffect(() => {
    getClients();
  }, []);

  async function handleDelete() {
    try {
      if (!selected) {
        toast.warn('Você precisa selecionar um registro !!');
        return;
      }

      Dialog.show({
        title: 'Deletar registro',
        subText: 'Tem certeza que deseja apagar o registro ?',
        positive: async () => {
          await api.delete(`/medrecord/delete/${selected}`);

          loadMedRecords();
        },
      });
    } catch (error) {
      toast.error('Um erro ocoreu ao tentar deletar o registro');
    }
  }

  function handleEdit() {
    try {
      if (!selected) {
        toast.warn('Você precisa selecionar um registro !!');
        return;
      }

      Dialog.show({
        title: 'Edição de dados',
        subText: 'Tem certeza que deseja editar a descrição de consulta ?',
        positive: () => history.push('/medrecord/create', {
          item: listRecordsDefault?.filter(
            (record) => record.id === selected,
          )[0],
        }),
      });
    } catch (error) {
      toast.error('Um erro ocoreu ao tentar editar o registro');
    }
  }

  function showModal() {
    try {
      if (!selected) {
        toast.warn('Você precisa selecionar um registro !!');
        return;
      }

      refModal.current?.show(records.filter((record) => record.id === selected)[0]);
    } catch (error) {
      toast.error('Um erro ocoreu ao tentar visualizar o registro');
    }
  }

  const commandBarBtn: ICommandBarItemProps[] = [
    {
      key: 'add',
      text: 'Adicionar',
      split: true,
      iconProps: { iconName: 'Add' },
      onClick: () => history.push('/medrecord/create'),
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
    {
      key: 'view',
      text: 'Ver descrição completa',
      split: true,
      iconProps: {
        iconName: 'EntryView',
        styles: { root: { color: 'blue' } },
      },
      onClick: showModal,
    },
  ];

  const columns: IColumns[] = [
    {
      fieldName: 'clientName',
      key: 'clientName',
      name: 'Paciente',
      maxWidth: 120,
    },
    {
      fieldName: 'specialistName',
      key: 'specialistName',
      name: 'Especialista',
      maxWidth: 120,
    },
    {
      fieldName: 'date',
      key: 'date',
      name: 'Data',
      maxWidth: 120,
    },
    {
      fieldName: 'time',
      key: 'time',
      name: 'Hora',
      maxWidth: 120,
    },
    {
      fieldName: 'description',
      key: 'description',
      name: 'Descrição',
      maxWidth: 500,
    },
  ];

  const options: IDropdownOption[] = clients;

  return (
    <Container>
      <Header />
      <Panel>
        <HeaderForm
          src={medRecordImg}
          label="Prontuário"
          description="Para incluir uma descrição de consulta no prontuário preencha os campos abaixo."
        />
        <Dropdown
          onChange={(_, item) => loadMedRecords(item)}
          label="Selecione um paciente para ver seu prontuário!"
          options={options}
        />
        <CommandBar items={commandBarBtn} />
        <FlatList
          columns={columns}
          data={listRecords}
          setSelection={(id) => setSelected((prev) => (id === prev ? undefined : id))}
        />
      </Panel>
      <Footer />
      <ModalPreview ref={refModal} />
    </Container>
  );
};

export { MedRecordHistory };
