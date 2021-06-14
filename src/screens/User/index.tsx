import React, { useCallback, useEffect, useState } from 'react';
import { CommandBar, ICommandBarItemProps, SearchBox } from '@fluentui/react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel } from '../../styles';
import userImg from '../../assests/images/user.png';
import { useApi } from '../../services/index';
import { IUser } from '../../commonTypes';
import { FlatList, IColumns } from '../../components/FlatList';
import { Dialog } from '../../utils';
import { HeaderForm } from '../../components/HeaderForm';

const User: React.FC = () => {
  const [users, setUser] = useState<IUser[]>([]);
  const [backUsers, setBackupUsers] = useState<IUser[]>([]);

  const api = useApi();
  const history = useHistory();
  const [itemSelect, setItemSelect] = useState<string>();

  const getUsers = useCallback(async () => {
    try {
      const { data } = await api.get('/users');

      if (data) {
        setUser(data);
        setBackupUsers(data);
      }
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
    if (users.filter((specialis) => specialis.id === itemSelect)[0]) {
      history.push('/user/registry', { item: users.filter((specialis) => specialis.id === itemSelect)[0] });
    } else {
      toast.warning('Você deve selecionar o Usuário!!', { autoClose: 3000 });
    }
  }

  function handleDelete() {
    if (users.filter((specialis) => specialis.id === itemSelect)[0]) {
      Dialog.show({
        title: 'Deletar Usuário',
        subText: 'Tem certeza que deseja editar o usuário?',
        positive: async () => {
          api.delete(`/users/${itemSelect}`).then(() => {
            getUsers();
            toast.success('Usuário deletado com sucesso !!', { autoClose: 3000 });
          });
        },
      });
    } else {
      toast.warning('Você deve selecionar o Usuário!!', { autoClose: 3000 });
    }
  }
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

  function handleFilter(text?: string) {
    setUser(backUsers.filter((user) => {
      if (user.name.toLowerCase().includes(String(text?.toLowerCase()))) {
        return true;
      }
      return false;
    }));

    if (text === '') setUser(backUsers);
  }

  const renderSearch = () => (
    <SearchBox
      styles={{ root: { minWidth: 300, width: 300 } }}
      placeholder="Filtrar especialistas, ex: registro, nome"
      onChange={(_, text) => handleFilter(text)}
    />
  );

  const commandBarBtn: ICommandBarItemProps[] = [
    {
      key: 'search',
      onRenderIcon: renderSearch,
    },
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
        <HeaderForm
          src={userImg}
          label="Usuários"
          description="Aqui estão os registros dos usuários cadastrados."
        />
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
