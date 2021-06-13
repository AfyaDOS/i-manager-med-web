import React, { useCallback, useEffect, useState } from 'react';
import {
  CommandBar, ICommandBarItemProps, Image, Text,
} from '@fluentui/react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel, View } from '../../styles';
import specialistImg from '../../assests/images/specialist.png';
import { useApi } from '../../services/index';
import { ISpecialist } from '../../commonTypes';
import { FlatList, IColumns } from '../../components/FlatList';
import styles from './styles';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<ISpecialist[]>();
  const api = useApi();
  const history = useHistory();
  const [selected, setSelected] = useState<string | undefined>();

  const getClients = useCallback(async () => {
    try {
      const { data } = await api.get('/clients/all');

      if (data) setClients(data);
    } catch (error) {
      toast.error('Erro ao obter a lista de especialistas');
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
      key: 'cpf',
      name: 'CPF',
      maxWidth: 200,
    },
    {
      fieldName: 'phone',
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

      await api.delete(`/clients/${selected}`);

      getClients();
    } catch (error) {
      console.log(error);
      toast.error('Um erro ocoreu ao tentar deletar o paciente');
    }
  }

  function handleEdit() {
    if (selected) {
      history.push('/client/registry', { item: clients?.filter((client) => client.id === selected)[0] });
    }
  }

  const commandBarBtn: ICommandBarItemProps[] = [
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
        <View style={styles.boxHeader}>
          <View style={{ flexDirection: 'row' }}>
            <Image src={specialistImg} width={60} />
            <View style={{ marginLeft: 20 }}>
              <Text variant="xxLarge">Pacientes</Text>
            </View>
          </View>
        </View>
        <CommandBar items={commandBarBtn} />
        <FlatList
          columns={columns}
          data={clients}
          setSelection={(id) => setSelected(id)}
        />
      </Panel>
      <Footer />
    </Container>
  );
};

export { Clients };
