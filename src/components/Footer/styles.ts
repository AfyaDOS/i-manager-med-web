import { Theme } from '@fluentui/react';
import styled from 'styled-components';

interface Props {
  theme: Theme
}

export const CardFooter = styled.footer<Props>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    background: white;
    z-index: 999;

    h5{
        margin-left:40px;
    }
  .git{
    margin-right:40px;
    display: flex;
    align-items: center;
    justify-content: center;

    .logoGit{
      width: 30px;
        height: 30px;
        object-fit:contain;
        margin: 4px;
      }
    p{
        margin-right: 20px;
    }
    }
  

`;
