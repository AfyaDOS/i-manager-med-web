import { ITextField, TextField } from '@fluentui/react';
import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';

interface Props {
  name: string;
  label?: string;
}

const Input: React.FC<Props> = ({ name, label }) => {
  const inputRef = useRef<ITextField>(null);
  const {
    fieldName, defaultValue, registerField, error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.value,
      setValue: (ref: React.RefObject<ITextField>, value: string) => {
        if (ref.current) {
          // eslint-disable-next-line no-param-reassign
          ref.current.value = value;
        }
      },
      clearValue: (ref: React.RefObject<ITextField>) => {
        if (ref.current) {
          // eslint-disable-next-line no-param-reassign
          ref.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <TextField
      label={label}
      componentRef={inputRef}
      defaultValue={defaultValue}
      errorMessage={error}
    />
  );
};

export { Input };
