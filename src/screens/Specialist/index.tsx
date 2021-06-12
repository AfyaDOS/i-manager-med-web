import React, { useCallback, useEffect, useState } from 'react';
import {
  Image, List, PrimaryButton, Text,
} from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Icon, FontIcon } from '@fluentui/react/lib/Icon';
import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel, View } from '../../styles';
import specialistImg from '../../assests/images/specialist.png';
import { useApi } from '../../services/index';
import { Row, RowBtn, Colunm } from './styles';
import { ISpecialist } from '../../commonTypes';

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
  }, [specialists]);

  function handleEdit(item: any) {
    history.push('/specialist/registry', { item });
  }

  function handleDelete(id: string | undefined) {
    api.delete(`/specialist/${id}`);
  }

  const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200, marginTop: 10 } };

  return (
    <Container>
      <Header />
      <Panel>
        <Icon iconName="OpenEnrollmentIcon" />
        <FontIcon aria-label="OpenEnrollmentIcon" iconName="OpenEnrollmentIcon" />
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
        <List
          style={{ width: '100%' }}
          items={specialists}
          onRenderCell={(item) => (
            <Row>
              <Colunm>
                <Text variant="xLarge">{item?.name.toUpperCase()}</Text>
                <div>
                  {
                    item?.specialties.map((item2) => (
                      <Text variant="large">{` ${item2.specialty}`}</Text>
                    ))
                  }
                </div>
              </Colunm>
              <RowBtn>
                <PrimaryButton onClick={() => handleEdit(item)}>
                  Editar
                </PrimaryButton>
                <PrimaryButton onClick={() => handleDelete(item?.id)}>
                  Excluir
                </PrimaryButton>
              </RowBtn>
            </Row>
          )}

        />
      </Panel>
      <Footer />
    </Container>

  );
};

export { Specialist };
