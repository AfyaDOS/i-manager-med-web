import styled from 'styled-components';
import { makeStyles, Theme } from '@fluentui/react';

interface Props {
  theme: Theme;
}
export default makeStyles({ containerForm: { height: '100%' } });

export const Row = styled.div<Props>`
    display: flex;
    height: 100%;
    width: 100%;
    flex-wrap:'no-wrap';
    align-items: center;
    border: 1px solid black;
    margin:10px 0px;
    justify-content: space-between;
    
    &:hover{
      background:grey;

    }
`;

export const Colunm = styled.div<Props>`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    flex-wrap:'no-wrap';
`;
export const RowBtn = styled.div<Props>`
    display: flex;
    flex-direction:column;
    height: 100%;
    width: 60px;
    flex-wrap:'no-wrap';
    align-items: flex-end;
    justify-content: flex-end;

    button{
      width: 32px;
      height: 20px;
      margin:5px
    }
    
`;
