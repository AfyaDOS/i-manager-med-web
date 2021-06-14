import {
  Modal,
  Text,
  getTheme,
  mergeStyleSets,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { IMedRecord } from '../../commonTypes';
import { Column, Row, View } from '../../styles';
import styles from './styles';

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    minHeight: '80%',
    minWidth: '80%',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'start',
      fontWeight: 'bold',
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});

export interface HandleModal{
    show: (item: IMedRecord) => void
}

const ModalPreview = forwardRef<HandleModal>((_, ref) => {
  const [open, { setFalse, toggle }] = useBoolean(false);
  const [record, setRecord] = useState<IMedRecord | undefined>();

  function show(item: IMedRecord) {
    toggle();
    setRecord(item);
  }

  useImperativeHandle(ref, () => ({ show }));
  return (
    <Modal
      isOpen={open}
      onDismiss={setFalse}
      isBlocking={false}
      containerClassName={contentStyles.container}
    >
      <View className={contentStyles.header}>
        <Row>
          <Column>
            <Text style={styles.textHeader}>Paciente:</Text>
            <Text>{record?.client.name}</Text>
            <Text>Especialista:</Text>
            <Text>{record?.specialist.name}</Text>
          </Column>
          <Column>
            <Text>Data:</Text>
            <Text>{record?.created_at}</Text>
            <Text>Hora:</Text>
            <Text>{record?.created_at}</Text>
          </Column>
        </Row>
      </View>
      <View className={contentStyles.body}>
        <Text>Descrição:</Text>
        <Text>{record?.description}</Text>
      </View>
    </Modal>
  );
});

export { ModalPreview };
