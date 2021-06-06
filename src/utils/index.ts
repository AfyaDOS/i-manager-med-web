import { createRef } from 'react';
import { IHandlePanel } from '../drawer';

export const refPanel = createRef<IHandlePanel>();

export function open() {
  refPanel.current?.open();
}
