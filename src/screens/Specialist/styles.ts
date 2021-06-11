import styled from 'styled-components';
import { makeStyles, Theme } from '@fluentui/react';

interface Props {
    theme: Theme;
}
export default makeStyles({ containerForm: { height: '100%' } });

export const Row = styled.div<Props>`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    height: 100%;
      .list{
    background: 'black';
    color: black;
    position: 'absolute';
    padding: 10;
    bottom: 0;
    left: 0;
    width: '100%';
    font-size: small;
    box-sizing: 'border-box';
    z-index: 999;
  },

`;
