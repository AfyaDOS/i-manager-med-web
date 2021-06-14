import {
  DatePicker,
  IDatePickerProps,
  IDatePickerStrings,
} from '@fluentui/react';
import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';

interface Props extends IDatePickerProps {
  name: string;
  strings: IDatePickerStrings;
}

interface IRef {
  value?: Date | undefined | null;
}

const UnformDatePicker: React.FC<Props> = ({
  onSelectDate,
  name,
  strings,
  ...props
}) => {
  const dropDownRef = useRef<IRef>({ value: undefined });

  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField<IRef>({
      name: fieldName,
      ref: dropDownRef.current,
      setValue: (ref: any, value: any) => {
        dropDownRef.current.value = value;
      },
      getValue: (ref: any) => {
        if (!ref.value) {
          return '';
        }
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <DatePicker
      {...props}
      styles={{ root: { marginTop: 5 } }}
      value={
        dropDownRef.current.value
          ? new Date(dropDownRef.current.value)
          : undefined
      }
      onSelectDate={(date) => {
        dropDownRef.current.value = date;
        if (typeof onSelectDate === 'function') onSelectDate(date);
      }}
      isRequired={!!error}
      strings={{ ...strings, isRequiredErrorMessage: error }}
    />
  );
};

export { UnformDatePicker };
