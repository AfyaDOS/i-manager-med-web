import React, { useCallback, useEffect, useState } from 'react';
import { CommandBar, ICommandBarItemProps, SearchBox } from '@fluentui/react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel } from '../../styles';
import specialistImg from '../../assests/images/specialist.png';
import { useApi } from '../../services/index';
import { IClient } from '../../commonTypes';
import { FlatList, IColumns } from '../../components/FlatList';
import { Dialog } from '../../utils';
import { HeaderForm } from '../../components';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>();
  const [backupClients, setBackupClients] = useState<IClient[]>([]);
  const api = useApi();
  const history = useHistory();
  const [selected, setSelected] = useState<string | undefined>();

  const getClients = useCallback(async () => {
    try {
      const { data } = await api.get('/clients');

      if (data) {
        setClients(data);
        setBackupClients(data);
      }
    } catch (error) {
      toast.error('Erro ao obter a lista de pacientes');
    }
  }, []);

  useEffect(() => {
    getClients();
  }, []);

  const columns: IColumns[] = [
    {
      fieldName: 'name',
      key: 'name',
      name: 'Paciente',
      maxWidth: 200,
    },
    {
      fieldName: 'cpf',
      mask: '$$$.$$$.$$$-$$',
      key: 'cpf',
      name: 'CPF',
      maxWidth: 200,
    },
    {
      fieldName: 'phone',
      mask: '($$) $.$$$$-$$$$',
      key: 'phone',
      name: 'Celular',
      maxWidth: 120,
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

          getClients();
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
        positive: () => history.push('/client/registry', { item: clients?.filter((client) => client.id === selected)[0] }),
      });
    }
  }

  function handleFilter(text?: string) {
    setClients(
      backupClients.filter((client) => {
        if (
          client.name.toLowerCase().includes(String(text?.toLowerCase()))
          || client.cpf.toLowerCase().includes(String(text?.toLowerCase()))
        ) {
          return true;
        }
        return false;
      }),
    );

    if (text === '') setClients(backupClients);
  }

  const renderSearch = () => (
    <SearchBox
      styles={{ root: { minWidth: 300, width: 300 } }}
      placeholder="Filtrar pacientes, ex: cpf, nome"
      onChange={(_, text) => handleFilter(text)}
    />
  );

  const commandBarBtn: ICommandBarItemProps[] = [
    {
      key: 'search',
      onRenderIcon: renderSearch,
    },
    {
      key: 'add',
      text: 'Adicionar',
      split: true,
      iconProps: { iconName: 'Add' },
      onClick: () => history.push('/client/registry'),
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
          src={specialistImg}
          label="Pacientes"
          description="Aqui estão os registros dos pacientes cadastrados."
        />
        <CommandBar items={commandBarBtn} />
        <FlatList
          columns={columns}
          data={clients}
          setSelection={(id) => setSelected((prev) => (id === prev ? undefined : id))}
        />
      </Panel>
      <Footer />
    </Container>
  );
};

export { Clients };
