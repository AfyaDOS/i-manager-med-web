import React, { useCallback, useEffect, useState } from 'react';
import {
  Image, List, PrimaryButton, Text,
} from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel, View } from '../../styles';
import specialistImg from '../../assests/images/specialist.png';
import { useApi } from '../../services/index';
import { Row } from './styles';

interface ISpecialist {
  id: string;
  name: string;
  email: string;
  registry: string;
  phone: string;
  cell: string;
}

const Specialist: React.FC = () => {
  const [specialists, setSpeclialist] = useState<ISpecialist[]>([]);
  const api = useApi();
  const history = useHistory();

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

  function handleEdit(item: any) {
    history.push('/specialist/registry', { item });
  }

  return (
    <Container>
      <Header />
      <Panel>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Image src={specialistImg} width={60} />
            <View style={{ marginLeft: 20 }}>
              <Text variant="xxLarge">Especialistas</Text>
              <Text>
                .
              </Text>
            </View>
          </View>
        </View>
        <List
          items={specialists}
          onRenderCell={(item) => (
            <Row>
              <Text>{item?.name}</Text>
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

export { Specialist };
