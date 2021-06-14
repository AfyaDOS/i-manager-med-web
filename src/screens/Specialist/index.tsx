import React, { useCallback, useEffect, useState } from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react';
import { toast } from 'react-toastify';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel } from '../../styles';
import specialistImg from '../../assests/images/specialist.png';
import { useApi } from '../../services/index';
import { ISpecialist } from '../../commonTypes';
import { FlatList, IColumns } from '../../components/FlatList';
import { Dialog } from '../../utils';
import { HeaderForm } from '../../components/HeaderForm';

const Specialist: React.FC = () => {
  const [specialists, setSpecialist] = useState<ISpecialist[]>([]);
  const [backupSpecialist, setBackupSpecialist] = useState<ISpecialist[]>([]);
  const api = useApi();
  const history = useHistory();
  const [itemSelect, setItemSelect] = useState<string>();

  const getSpecialists = useCallback(async () => {
    try {
      const { data } = await api.get('/specialist');

      if (data) {
        setSpecialist(data);
        setBackupSpecialist(data);
      }
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
          api.delete(`/specialist/${itemSelect}`).then(() => {
            getSpecialists();
            toast.success('Especialista deletado com sucesso !!', { autoClose: 3000 });
          });
        },
      });
    } else {
      toast.warning('Você deve selecionar o Especialista !!', { autoClose: 3000 });
    }
  }

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
      mask: '$$$$$$-$$',
    },
    {
      fieldName: 'specialties',
      key: 'specialties',
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
      mask: '($$) $$$$$-$$$$',

    },
    {
      fieldName: 'cell',
      key: 'cell',
      name: 'Celular',
      maxWidth: 120,
      mask: '($$) $$$$-$$$$',

    },
  ];
  function handleFilter(text?: string) {
    setSpecialist(backupSpecialist.filter((client) => {
      if (client.name.toLowerCase().includes(String(text?.toLowerCase()))) {
        return true;
      }
      return false;
    }));

    if (text === '') setSpecialist(backupSpecialist);
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
          src={specialistImg}
          label="Especialistas"
          description="Aqui estão os registros dos especialistas cadastrados."
        />
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
