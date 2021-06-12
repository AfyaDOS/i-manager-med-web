import React from 'react';
import { Text } from '@fluentui/react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Container, Panel } from '../../styles';

const NotFound: React.FC = () => (
  <Container>
    <Header />
    <Panel style={{ height: 'calc(100vh - 160px)', justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="mega">404</Text>
      <Text variant="mega">Página não encontrada.</Text>
    </Panel>
    <Footer />
  </Container>
);

export { NotFound };
