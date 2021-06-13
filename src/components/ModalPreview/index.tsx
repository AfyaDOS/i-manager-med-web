import { Modal, Text } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import React from 'react';
import { View } from '../../styles';

const ModalPreview: React.FC = () => {
  const [open, { setFalse }] = useBoolean(true);
  return (
    <Modal
      isOpen={open}
      onDismiss={setFalse}
      isBlocking={false}
    >
      <View>
        <Text>Ola mundo</Text>
      </View>

    </Modal>
  );
};

export { ModalPreview };
