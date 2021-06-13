/* eslint-disable no-nested-ternary */
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { useField } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  name: string;
  options: IDropdownOption[];
  label: string;
}

const Select: React.FC<Props> = ({ name, options, label }) => {
  const {
    fieldName, registerField, error, clearError,
  } = useField(name);
  const refSelect = useRef<string | undefined>();
  const [defaultValue, setDefaultValue] = useState<string | undefined>();
  const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: refSelect,
      getValue: (ref) => ref.current,
      setValue: (ref, value: string) => {
        setDefaultValue(value);
      },
      clearValue: () => {
        setSelectedItem(undefined);
      },
    });
  }, [fieldName, registerField, defaultValue]);

  const onChange = (
    event?: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
  ): void => {
    setDefaultValue(undefined);
    setSelectedItem(item);
  };

  useEffect(() => {
    refSelect.current = defaultValue || selectedItem?.key as string | undefined;
  }, [selectedItem, defaultValue]);

  return (
    <Dropdown
      selectedKey={
        defaultValue !== undefined && selectedItem === undefined
          ? defaultValue
          : selectedItem
            ? selectedItem.key
            : undefined
      }
      onFocus={clearError}
      styles={{ root: { marginTop: '1em' } }}
      onChange={onChange}
      label={label}
      errorMessage={error}
      options={options || []}
    />
  );
};

export { Select };
