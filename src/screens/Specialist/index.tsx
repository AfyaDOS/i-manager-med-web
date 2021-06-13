import React, { useCallback, useEffect, useState } from 'react';
import {
  CommandBar, ICommandBarItemProps, Image, Text,
} from '@fluentui/react';
import { toast } from 'react-toastify';
import { Icon, FontIcon } from '@fluentui/react/lib/Icon';
import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel, View } from '../../styles';
import specialistImg from '../../assests/images/specialist.png';
import { useApi } from '../../services/index';
import { ISpecialist } from '../../commonTypes';
import { FlatList, IColumns } from '../../components/FlatList';
import { Dialog } from '../../utils';

const Specialist: React.FC = () => {
  const [specialists, setSpeclialist] = useState<ISpecialist[]>([]);
  const api = useApi();
  const history = useHistory();
  const [itemSelect, setItemSelect] = useState<string>();

  const getSpecialists = useCallback(async () => {
    try {
      const { data } = await api.get('/specialist');

      if (data) setSpeclialist(data);
    } catch (error) {
      toast.error('Erro ao obter a lista de especialistas');
    }
  }, []);

  useEffect(() => {
    getSpecialists();
  }, []);
  function handleAdd() {
    history.push('/specialist/registry');
  }
  function handleEdit() {
    if (specialists.filter((specialis) => specialis.id === itemSelect)[0]) {
      history.push('/specialist/registry', { item: specialists.filter((specialis) => specialis.id === itemSelect)[0] });
    } else {
      toast.warning('Você deve selecionar o Especialista !!', { autoClose: 3000 });
    }
  }

  function handleDelete() {
    if (specialists.filter((specialis) => specialis.id === itemSelect)[0]) {
      Dialog.show({
        title: 'Deletar Especialista',
        subText: 'Tem certeza que deseja editar o Especialista?',
        positive: async () => {
          api.delete(`/users/${itemSelect}`).then(() => {
            getSpecialists();
            toast.success('Especialista deletado com sucesso !!', { autoClose: 3000 });
          });
        },
      });
    } else {
      toast.warning('Você deve selecionar o Especialista !!', { autoClose: 3000 });
    }
  }
  const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200, marginTop: 10 } };

  const columns: IColumns[] = [
    {
      fieldName: 'name',
      key: 'name',
      name: 'Especialista',
      maxWidth: 120,
    },
    {
      fieldName: 'registry',
      key: 'registry',
      name: 'Registro',
      maxWidth: 120,
    },
    {
      fieldName: 'specialties',
      key: 'name',
      name: 'Especialidades',
      maxWidth: 120,
      isArray: { fieldName: 'specialty' },
    },
    {
      fieldName: 'email',
      key: 'email',
      name: 'E-mail',
      maxWidth: 120,
    },
    {
      fieldName: 'phone',
      key: 'phone',
      name: 'Telefone',
      maxWidth: 120,
    },
    {
      fieldName: 'cell',
      key: 'cell',
      name: 'Celular',
      maxWidth: 120,
    },
  ];
  const commandBarBtn: ICommandBarItemProps[] = [
    {
      key: 'novo',
      text: 'Adicionar',
      split: true,
      iconProps: { iconName: 'Add' },
      onClick: handleAdd,
    },
    {
      key: 'edit',
      text: 'Editar',
      split: true,
      iconProps: { iconName: 'Edit' },
      onClick: handleEdit,
    },
    {
      key: 'excluir',
      text: 'Excluir',
      split: true,
      iconProps: {
        iconName: 'Delete',
        styles: { root: { color: 'red' } },
      },
      onClick: handleDelete,
    },
  ];
  return (
    <Container>
      <Header />
      <Panel>
        <Icon iconName="OpenEnrollmentIcon" />
        <FontIcon
          aria-label="OpenEnrollmentIcon"
          iconName="OpenEnrollmentIcon"
        />
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Image src={specialistImg} width={60} />
            <View style={{ marginLeft: 20 }}>
              <Text variant="xxLarge">Especialistas</Text>
            </View>
          </View>
          <SearchBox
            styles={searchBoxStyles}
            placeholder="Buscar"
            onEscape={(ev) => {
              console.log(ev);
            }}
            onClear={(ev) => {
              console.log(ev);
            }}
            onChange={(_, newValue) => console.log(`'SearchBox onChange fired: ' ${newValue}`)}
            onSearch={(newValue) => console.log(`'SearchBox onSearch fired: ' ${newValue}`)}
          />
        </View>
        <CommandBar items={commandBarBtn} />
        <FlatList
          columns={columns}
          data={specialists}
          setSelection={(id) => setItemSelect(id)}
        />
      </Panel>
      <Footer />
    </Container>
  );
};

export { Specialist };
