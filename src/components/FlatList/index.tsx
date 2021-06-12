/* eslint-disable no-unused-vars */
import {
  Check, mergeStyleSets, Separator, Spinner, Stack, Text,
} from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { View } from '../../styles';

import styles from './styles';

export interface IColumns {
  key: string;
  name: string;
  fieldName: string;
  minWidth?: number;
  maxWidth: number;
  isArray?: {
    fieldName: string;
  };
}

interface Props {
  columns: IColumns[];
  data?: any;
  clear?: boolean;
  setSelection: (id:string) => void;
}

const FlatList: React.FC<Props> = ({
  data, columns, clear, setSelection,
}) => {
  const [checked, setChecked] = useState<string | undefined>();

  const mergedStyles = mergeStyleSets({
    root: {
      maxHeight: '65vh',
      overflow: 'auto',
    },
    item: { selectors: { '&:hover': { background: '#eee' } } },
    text: {
      display: 'block',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  });

  useEffect(() => {
    if (clear) setChecked(undefined);
  }, [clear]);

  function handleSelect(key: string) {
    setChecked((prev) => (prev === key ? undefined : key));
    setSelection(key);
  }

  return (
    <View style={styles.container}>
      <Stack>
        <Stack horizontal>
          <Stack.Item tokens={{ padding: 10 }}>
            <Check />
          </Stack.Item>
          {columns.map(({ name, key, maxWidth }) => (
            <Stack.Item
              style={{ maxWidth }}
              grow={maxWidth}
              tokens={{ padding: 10 }}
              className={mergedStyles.item}
              key={key}
            >
              <Text>{name}</Text>
            </Stack.Item>
          ))}
        </Stack>
        <Separator />
        <Stack className={mergedStyles.root}>
          {data
            ? data.map((item: any) => (
              <Stack
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={mergedStyles.item}
                horizontal
              >
                <Stack.Item tokens={{ padding: 10 }}>
                  <Check checked={checked === item.id} />
                </Stack.Item>
                {columns.map(({ maxWidth, fieldName, isArray }) => (
                  <Stack.Item
                    key={fieldName}
                    style={{ maxWidth }}
                    tokens={{ padding: 10 }}
                    grow={maxWidth}
                  >
                    {!isArray ? (<Text className={mergedStyles.text}>{item[fieldName]}</Text>) : (
                      <Text>
                        {item[fieldName].map((obj: any) => obj[isArray.fieldName]).join(' - ')}
                      </Text>
                    )}
                  </Stack.Item>
                ))}
              </Stack>
            )) : <Spinner label="Carregando..." />}
        </Stack>
      </Stack>
    </View>
  );
};

export { FlatList };
