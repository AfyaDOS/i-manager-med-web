import React, { useCallback, useEffect, useState } from 'react';
import {
  CommandBar, ICommandBarItemProps, Image, Text,
} from '@fluentui/react';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel, View } from '../../styles';
import specialistImg from '../../assests/images/specialist.png';
import { useApi } from '../../services/index';
import { ISpecialist } from '../../commonTypes';
import { FlatList, IColumns } from '../../components/FlatList';
import styles from './styles';

const Clients: React.FC = () => {
  const [specialists, setSpeclialist] = useState<ISpecialist[]>();
  const api = useApi();

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
  const commandBarBtn: ICommandBarItemProps[] = [
    {
      key: 'excluir',
      text: 'Excluir',
      split: true,
      iconProps: {
        iconName: 'Delete',
        styles: { root: { color: 'red' } },
      },
    },
    {
      key: 'edit',
      text: 'Editar',
      split: true,
      iconProps: { iconName: 'Edit' },
    },
  ];

  const getClients = useCallback(async () => {
    try {
      const { data } = await api.get('/clients/getall');

      if (data) setSpeclialist(data);
    } catch (error) {
      toast.error('Erro ao obter a lista de especialistas');
    }
  }, []);

  useEffect(() => {
    getClients();
  }, []);

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
          data={specialists}
          setSelection={(id) => console.log(id)}
        />
      </Panel>
      <Footer />
    </Container>
  );
};

export { Clients };
