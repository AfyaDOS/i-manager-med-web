import { ITextFieldProps, TextField } from '@fluentui/react';
import { useField } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';

interface Props extends Omit<ITextFieldProps, 'onFocus' | 'onChange' | 'defaultValue' | 'errorMessage' | 'value'> {
  name: string;
  label?: string;
  mask?: string;
}

const Input: React.FC<Props> = ({
  name, label, mask, ...rest
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
      getValue: (ref) => ref.current?.replace(/\D/g, ''),
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
      console.log(valueMasked);
      setInputValue(valueMasked);
    } else if (text === '') {
      setInputValue(undefined);
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
