import styled from 'styled-components';
import { makeStyles, Theme } from '@fluentui/react';

interface Props {
  theme: Theme;
}
export default makeStyles({ containerForm: { height: '100%' } });

export const Card = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(187, 214, 255, 0.08) 35.51%,
    rgba(6, 106, 255, 0.53) 100%
  );

  body{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    img{
    }

    .cardLogin{
      width: 420px;
      height: 440px;
      background: #FFFFFF;
      box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .logoMed{
        width: 233px;
        height: 60px;
        object-fit:contain;
        margin-left: 20px;
        margin-right: 20px;
      }
       .logoAfyados{
        width: 197px;
        height: 108px;
        object-fit:contain;
        margin-left: 20px;
        margin-right: 20px;
      }

      p{
        font-style: normal;
        font-weight: 800;
        font-size: 42px;
        line-height: 44px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.015em;
        color: #262BAB;
      }

      .button{
        margin-bottom: 20px;
        width: 36% !important;
      }
    }
  }
`;
