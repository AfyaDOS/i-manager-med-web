import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Panel, PanelType } from '@fluentui/react';
import { Nav } from '../components';

interface Props{
  state?: boolean;
}

export interface IHandlePanel{
  open: () => void
}

const Drawer = forwardRef<IHandlePanel, Props>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen((prev) => !prev);
  }

  useImperativeHandle(ref, () => ({ open }));

  return (
    <Panel
      isLightDismiss
      styles={{
        commands: { display: 'none' },
        content: {
          padding: 0,
          margin: 0,
        },
      }}
      hasCloseButton={false}
      type={PanelType.smallFixedNear}
      onDismiss={() => setIsOpen(false)}
      isOpen={isOpen}
    >
      <Nav />
    </Panel>
  );
});

export { Drawer };
