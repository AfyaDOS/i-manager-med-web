import React, {
  forwardRef, useImperativeHandle, useRef, useState,
} from 'react';
import {
  Dialog as FluentDialog, DialogFooter, PrimaryButton, DefaultButton, DialogType,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { IShowDialog } from '../../commonTypes';

export interface HandleDialog{
    show: (options: IShowDialog) => void
}

const dialogStyles = { main: { maxWidth: 450 } };

const Dialog = forwardRef<HandleDialog>((_, ref) => {
  const [visible, { toggle, setFalse }] = useBoolean(false);
  const positiveRef = useRef<() => void>(() => null);
  const negativeRef = useRef<() => void>(() => null);
  const [title, setTitle] = useState('');
  const [subText, setSubText] = useState('');

  function show(options: IShowDialog) {
    toggle();
    setTitle(options.title);
    setSubText(options.subText);

    if (typeof options.positive === 'function') positiveRef.current = options.positive;
    if (typeof options.negative === 'function') negativeRef.current = options.negative;
  }

  const dialogContentProps = {
    type: DialogType.normal,
    title,
    subText,
  };

  useImperativeHandle(ref, () => ({ show }));

  function handlePositiveButton() {
    if (typeof positiveRef.current === 'function') positiveRef.current();
    toggle();
  }

  function handleNegativeButton() {
    if (typeof positiveRef.current === 'function') negativeRef.current();
    toggle();
  }

  return visible ? (
    <FluentDialog
      hidden={!visible}
      onDismiss={setFalse}
      dialogContentProps={dialogContentProps}
      modalProps={{
        isBlocking: false,
        styles: dialogStyles,
      }}
    >
      <DialogFooter>
        <PrimaryButton onClick={handlePositiveButton} text="SIM" />
        <DefaultButton onClick={handleNegativeButton} text="CANCELAR" />
      </DialogFooter>
    </FluentDialog>
  ) : null;
});

export { Dialog };
