import React, { useEffect, useState } from 'react';
import {
  CommandBar, ICommandBarItemProps, Image, Text,
} from '@fluentui/react';
import { Icon, FontIcon } from '@fluentui/react/lib/Icon';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel, View } from '../../styles';
import medRecordImg from '../../assests/images/med-record.png';
import { useApi } from '../../services/index';
import { IClient, ISpecialist } from '../../commonTypes/index';
import { FlatList, IColumns } from '../../components/FlatList';

interface IMedRecord {
  id: string;
  client: IClient;
  specialist: ISpecialist;
  // eslint-disable-next-line camelcase
  create_at: Date;
  description: string;
}

const MedRecordHistory: React.FC = () => {
  const clientID = 'cd4a6977-8612-4250-97b2-2740bdf8b832';

  const [medRecords, setMedRecord] = useState<IMedRecord[]>([]);
  const api = useApi();
  const history = useHistory();
  const [itemSelect, setItemSelect] = useState<string>();

  async function loadMedRecords() {
    try {
      const response = await api.get(`/medrecord/get/${clientID}`);
      if (response) setMedRecord(response.data);
    } catch (error) {
      toast.error('Erro ao obter o prontuário');
    }
  }

  useEffect(() => {
    loadMedRecords();
  }, []);

  function handleEdit() {
    history.push(`/medrecord/update/${itemSelect}`);
  }

  function handleDelete() {
    api.delete(`/medrecor/delete/${itemSelect}`);
  }

  const columns: IColumns[] = [
    {
      fieldName: 'client',
      key: 'client',
      name: 'Paciente',
      maxWidth: 120,
    },
    {
      fieldName: 'specialist',
      key: 'specialist',
      name: 'Especialista',
      maxWidth: 120,
    },
    {
      fieldName: 'create_at',
      key: 'create_at',
      name: 'Data',
      maxWidth: 120,
    },
    {
      fieldName: 'description',
      key: 'description',
      name: 'Descrição',
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
      onClick: handleDelete,
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
        <Icon iconName="OpenEnrollmentIcon" />
        <FontIcon
          aria-label="OpenEnrollmentIcon"
          iconName="OpenEnrollmentIcon"
        />
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Image src={medRecordImg} width={60} />
            <View style={{ marginLeft: 20 }}>
              <Text variant="xxLarge">Especialistas</Text>
            </View>
          </View>
        </View>
        <CommandBar items={commandBarBtn} />
        <FlatList
          columns={columns}
          data={medRecords}
          setSelection={(id) => setItemSelect(id)}
        />
      </Panel>
      <Footer />
    </Container>
  );
};

export { MedRecordHistory };
