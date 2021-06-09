import { Theme } from '@fluentui/react';
import styled from 'styled-components';

interface Props {
    theme: Theme
}

export const CardHeader = styled.header<Props>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width:100%;
    height:60px;
    background: white;

    img{
        width: 233px;
        height: 60px;
        object-fit:contain;
        margin-left: 20px;
    }
    .button{
        margin-right:40px;
        display: flex;
        
    }
`;
