import { ITextFieldProps, TextField } from '@fluentui/react';
import { useField } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';

interface Props extends Omit<ITextFieldProps, 'onFocus' | 'onChange' | 'defaultValue' | 'errorMessage' | 'value'> {
  name: string;
  mask?: string;
  numeric?: boolean;
}

const Input: React.FC<Props> = ({
  name, label, mask, numeric, ...rest
}) => {
  const {
    fieldName, defaultValue, registerField, error, clearError,
  } = useField(name);
  const [inputValue, setInputValue] = useState<string | undefined>();
  const inputRef = useRef<string | undefined>();

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => (numeric ? ref.current?.replace(/\D/g, '') : ref.current),
      setValue: (ref, text: string | undefined) => {
        setInputValue(text);
      },
      clearValue: () => {
        setInputValue(undefined);
      },
    });
  }, [inputValue, fieldName, registerField]);

  useEffect(() => {
    inputRef.current = inputValue;
  }, [inputValue]);

  function handleChange(text?: string) {
    if (mask && text) {
      const maskArray = mask.split('');
      const maskedArray: string[] = [];
      const value = text.replace(/\D/g, '');
      let index = 0;

      const valueArray = value.split('');

      maskArray.forEach((v, i) => {
        if (v === '$') {
          maskedArray[i] = valueArray[index] ?? '';
          index += 1;
        } else {
          maskedArray[i] = valueArray[index] ? v : '';
        }
      });

      const valueMasked = maskedArray.join('');
      setInputValue(valueMasked);
    } else if (text === '') {
      setInputValue(undefined);
    } else {
      setInputValue(text);
    }
  }

  return (
    <TextField
      {...rest}
      label={label}
      value={inputValue}
      onChange={(_, text) => handleChange(text)}
      onFocus={clearError}
      defaultValue={defaultValue}
      errorMessage={error}
    />
  );
};
export { Input };
