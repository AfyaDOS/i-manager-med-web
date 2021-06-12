import React, { useEffect, useState } from 'react';
import {
  Image, List, PrimaryButton, Text,
} from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel, View } from '../../styles';
import medRecordImg from '../../assests/images/med-record.png';
import { useApi } from '../../services/index';
import { Row } from './styles';
import { IClient, ISpecialist } from '../../commonTypes/index';

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

  function handleEdit(item: any) {
    history.push('/medrecord/create', { item });
  }

  return (
    <Container>
      <Header />
      <Panel>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Image src={medRecordImg} width={60} />
            <View style={{ marginLeft: 20 }}>
              <Text variant="xxLarge">Prontuário</Text>
              <Text>
                .
              </Text>
            </View>
          </View>
        </View>
        <List
          items={medRecords}
          onRenderCell={(item) => (
            <Row>
              <Text>{item?.client.name}</Text>
              <Text>{item?.specialist.name}</Text>
              <Text>{item?.create_at}</Text>
              <Text>{item?.description}</Text>
              <PrimaryButton onClick={() => handleEdit(item)}>
                Editar
              </PrimaryButton>
            </Row>
          )}
        />
      </Panel>
      <Footer />
    </Container>

  );
};

export { MedRecordHistory };
