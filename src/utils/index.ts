import { createRef } from 'react';
import { IHandlePanel } from '../drawer';

export const refPanel = createRef<IHandlePanel>();

export function open() {
  refPanel.current?.open();
}

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
