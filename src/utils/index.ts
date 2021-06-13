/* eslint-disable no-unused-vars */
import React, { createRef } from 'react';
import * as Yup from 'yup';
import { HandleDialog } from '../components/Dialog';
import { IHandlePanel } from '../drawer';
import { IShowDialog } from '../commonTypes';

export const refPanel = createRef<IHandlePanel>();

export function open(): void {
  refPanel.current?.open();
}

export const refDialog = createRef<HandleDialog>();

class Dialog {
  static show(options: IShowDialog): void {
    refDialog.current?.show(options);
  }
}

export { Dialog };

export const states = [
  {
    key: 'ro',
    text: 'Rondônia',
  },
  {
    key: 'ac',
    text: 'Acre',
  },
  {
    key: 'am',
    text: 'Amazonas',
  },
  {
    key: 'rr',
    text: 'Roraima',
  },
  {
    key: 'pa',
    text: 'Pará',
  },
  {
    key: 'ap',
    text: 'Amapá',
  },
  {
    key: 'to',
    text: 'Tocantins',
  },
  {
    key: 'ma',
    text: 'Maranhão',
  },
  {
    key: 'pi',
    text: 'Piauí',
  },
  {
    key: 'ce',
    text: 'Ceará',
  },
  {
    key: 'rn',
    text: 'Rio Grande do Norte',
  },
  {
    key: 'pb',
    text: 'Paraíba',
  },
  {
    key: 'pe',
    text: 'Pernambuco',
  },
  {
    key: 'al',
    text: 'Alagoas',
  },
  {
    key: 'se',
    text: 'Sergipe',
  },
  {
    key: 'ba',
    text: 'Bahia',
  },
  {
    key: 'mg',
    text: 'Minas Gerais',
  },
  {
    key: 'es',
    text: 'Espírito Santo',
  },
  {
    key: 'rj',
    text: 'Rio de Janeiro',
  },
  {
    key: 'sp',
    text: 'São Paulo',
  },
  {
    key: 'pr',
    text: 'Paraná',
  },
  {
    key: 'sc',
    text: 'Santa Catarina',
  },
  {
    key: 'rs',
    text: 'Rio Grande do Sul',
  },
  {
    key: 'ms',
    text: 'Mato Grosso do Sul',
  },
  {
    key: 'mt',
    text: 'Mato Grosso',
  },
  {
    key: 'go',
    text: 'Goiás',
  },
  {
    key: 'df',
    text: 'Distrito Federal',
  },
];

export function setData(ref: any, data: any): void {
  if (data && ref.current) {
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          ref.current?.setFieldValue(`${key}.${subKey}`, subValue);
        });
      }
      ref.current?.setFieldValue(key, value);
    });
  }
}

type NamedStyles<T> = { [P in keyof T]: React.CSSProperties };

export const makeStyles = {
  create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>,
  ): T {
    return styles as T;
  },
};

export function setErrors(ref: any, err: any): void {
  const validationErrors = {};
  if (err instanceof Yup.ValidationError) {
    err.inner.forEach((error: any) => {
      if (typeof error.path === 'string') {
        Object.assign(validationErrors, { [error.path]: error.message });
      }
    });
    if (typeof ref?.current?.setErrors === 'function') {
      ref.current.setErrors(validationErrors);
    }
  }
}
