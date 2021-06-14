import {
  Modal,
  Text,
  getTheme,
  mergeStyleSets,
  IIconProps,
  IconButton,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { IMedRecord } from '../../commonTypes';
import { Column, Row, View } from '../../styles';
import styles from './styles';

const theme = getTheme();
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    minHeight: '60%',
    maxWidth: '10vw',
    minWidth: '80%',
    padding: 20,
    borderTop: `4px solid ${theme.palette.themePrimary}`,
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
      <IconButton
        style={styles.defaultButton}
        iconProps={cancelIcon}
        ariaLabel="Close popup modal"
        onClick={setFalse}
      />
      <View>
        <Row>
          <Column>
            <Text style={styles.textHeader}>Paciente:</Text>
            <Text style={styles.textHeaderBody}>{record?.client.name}</Text>
            <Text style={styles.textHeader}>Especialista:</Text>
            <Text style={styles.textHeaderBody}>{record?.specialist.name}</Text>
          </Column>
          <Column>
            <Text style={styles.textHeader}>Data:</Text>
            <Text style={styles.textHeaderBody}>
              {new Date(String(record?.created_at)).toLocaleDateString('pt-BR')}
            </Text>
            <Text style={styles.textHeader}>Hora:</Text>
            <Text style={styles.textHeaderBody}>
              {new Date(String(record?.created_at)).toLocaleTimeString('pt-BR')}
            </Text>
          </Column>
        </Row>
      </View>
      <View>
        <Text style={styles.textTitleBody}>Descrição:</Text>
        <Text style={styles.textBody}>{record?.description}</Text>
      </View>
    </Modal>
  );
});

export { ModalPreview };
