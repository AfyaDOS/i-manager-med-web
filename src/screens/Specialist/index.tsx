import React, { useEffect, useState } from 'react';
import { Image, Text } from '@fluentui/react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel, View } from '../../styles';
import { Row } from './styles';
import specialistImg from '../../assests/images/specialist.png';
import api from '../../services/index';

interface specialists {
  data: Array<specialist>;
}
interface specialist {
  name: string;
  id: string;

}
const Specialist: React.FC = () => {
  const [teste, setTeste] = useState<specialists>();
  const headers = {
    Authorization:
      ',eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2Y2FlNTJkLTkzNGMtNDk5MS05NDU3LTk3Njg4ZTg3YWI0YiIsIm5hbWUiOiJtYXJjZWxvIiwiaWF0IjoxNjIzMzM3NjYzLCJleHAiOjE2MjM0MjQwNjN9.NwVN8igJcuVptJxCqCd-Pyof7hhzk85hkRQxkImmswA',
  };
  useEffect(() => {
    api.get('/specialist', { headers })
      .then((resp) => {
        setTeste(resp);
        console.log(teste);
      });
  }, []);
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
        <Row>
          <ul>
            Id
            {teste?.data.map((todo) => (
              <li>{todo.id}</li>
            ))}
          </ul>
          <ul>
            Name
            {teste?.data.map((todo) => (
              <li>{todo.name}</li>
            ))}
          </ul>
        </Row>
      </Panel>
      <Footer />
    </Container>

  );
};

export { Specialist };
