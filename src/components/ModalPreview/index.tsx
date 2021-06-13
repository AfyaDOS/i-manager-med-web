import { Modal, Text } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { IMedRecord } from '../../commonTypes';
import { View } from '../../styles';

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
    <Modal isOpen={open} onDismiss={setFalse} isBlocking={false}>
      <View>
        <Text>{record?.client.name}</Text>
      </View>
    </Modal>
  );
});

export { ModalPreview };
