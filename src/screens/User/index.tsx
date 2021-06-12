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
import userImg from '../../assests/images/user.png';
import { useApi } from '../../services/index';
import { IUser } from '../../commonTypes';
import { FlatList, IColumns } from '../../components/FlatList';

const User: React.FC = () => {
  const [users, setUser] = useState<IUser[]>([]);
  const api = useApi();
  const history = useHistory();
  const [itemSelect, setItemSelect] = useState<string>();

  const getUsers = useCallback(async () => {
    try {
      const { data } = await api.get('/users');

      if (data) setUser(data);
    } catch (error) {
      toast.error('Erro ao obter a lista de usuários');
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  function handleAdd() {
    history.push('/user/registry');
  }
  function handleEdit() {
    history.push('/user/registry', { item: users.filter((specialis) => specialis.id === itemSelect)[0] });
  }

  function handleDelete() {
    api.delete(`/users/${itemSelect}`).then(() => {
      toast.success('Usuário deletado com sucesso !!', { autoClose: 3000 });
      history.go(0);
    });
  }
  const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200, marginTop: 10 } };

  const columns: IColumns[] = [
    {
      fieldName: 'name',
      key: 'name',
      name: 'Usuário',
      maxWidth: 120,
    },
    {
      fieldName: 'email',
      key: 'email',
      name: 'E-mail',
      maxWidth: 360,
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
            <Image src={userImg} width={60} />
            <View style={{ marginLeft: 20 }}>
              <Text variant="xxLarge">Usuários</Text>
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
          data={users}
          setSelection={(id) => setItemSelect(id)}
        />
      </Panel>
      <Footer />
    </Container>
  );
};

export { User };
