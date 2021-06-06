import { Theme } from '@fluentui/react';
import styled from 'styled-components';

interface Props{
    theme: Theme
}

export const Card = styled.div<Props>`
    display: flex;
    flex-direction: column;
    max-width: 30%;
    padding: 10px;
    border: ${(props) => `1px solid ${props.theme.palette.accent}`};
    transition: all 300ms;
    &:hover{
        box-shadow: 0 0 10px 10px #dadada;
    };
`;
