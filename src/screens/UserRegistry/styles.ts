import { makeStyles } from '@fluentui/react';
import styled from 'styled-components';

export default makeStyles({ containerForm: { height: '100%' } });

export const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.6fr;
    gap: 10px;
    height: 100%
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
`;
