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
import { IMedRecord } from '../../commonTypes/index';
import { FlatList, IColumns } from '../../components/FlatList';

const MedRecordHistory: React.FC = () => {
  const clientID = 'cd4a6977-8612-4250-97b2-2740bdf8b832';

  const api = useApi();
  const history = useHistory();
  const [itemSelect, setItemSelect] = useState<string>();
  const [listRecords, setListRecords] = useState();

  async function loadMedRecords() {
    try {
      const { data } = await api.get(`/medrecord/get/${clientID}`);
      if (data) {
        setListRecords(data.map((item: IMedRecord) => ({
          clientName: item.client.name,
          specialistName: item.specialist.name,
          description: item.description,
          date: new Date(item.created_at).toLocaleDateString(),
          time: new Date(item.created_at).toLocaleTimeString(),
          id: item.id,
        })));
      }
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
              <Text variant="xxLarge">Prontuário</Text>
            </View>
          </View>
        </View>
        <CommandBar items={commandBarBtn} />
        <FlatList
          columns={columns}
          data={listRecords}
          setSelection={(id) => setItemSelect(id)}
        />
      </Panel>
      <Footer />
    </Container>
  );
};

export { MedRecordHistory };
