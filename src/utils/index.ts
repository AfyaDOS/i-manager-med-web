/* eslint-disable no-unused-vars */
import React, { createRef } from 'react';
import * as Yup from 'yup';
import { IDatePickerStrings } from '@fluentui/react';
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

export function masked(maskOf: string, text: string): string {
  const maskArray = maskOf.split('');
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
  return valueMasked;
}

export const DayPickerStrings: IDatePickerStrings = {
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],

  days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],

  shortDays: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  monthPickerHeaderAriaLabel: '{0}, select to change the year',
  yearPickerHeaderAriaLabel: '{0}, select to change the month',
};

export function currencyFormt(value: string): string {
  let newValue = value.replace(/R/g, '');

  const array = newValue.split(',');

  if (array[1]?.length <= 1) {
    newValue = array[0].slice(0, array[0].length - 1);
  }

  newValue = newValue.replace(/\$/g, '');
  newValue = newValue.replace(/,.*?[0-9]{1,2}/g, '');
  newValue = newValue.replace(/ /g, '');
  newValue = newValue.replace(/\./g, '');

  return Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(Number(newValue));
}
