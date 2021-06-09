import { Theme } from '@fluentui/react';
import styled from 'styled-components';

interface Props {
  theme: Theme;
}

export const Card = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height:100vh;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(187, 214, 255, 0.08) 35.51%,
    rgba(6, 106, 255, 0.53) 100%
  );

  header {
    background-color: green;
    width: 100%;
    height: 60px;
  }
`;

export const CardUser = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 62vw;
  margin: 40px 0;  
  flex-wrap: wrap;
  background: #e7e7e7;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.25);

  .title {
    margin-left: 20px;
    padding-top: 20px;
    width: 100%;
    height: 125px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .logo {
      width: 125px;
      height: 125px;
    }
    .textCardHeader {
      margin-left: 20px;

      & p {
        margin-top: 20px;
      }
    }
  }

  .textColumn {
    margin-left: 60px;
    width: 40%;
    margin-bottom: 40px;

    .city {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;

      .inputOne {
        width: 60%;
      }
    }

    .button {
      margin-top: 29.09px;
      width: 100%;
    }
  }

  .separator {
    margin-left: 60px;
    border-right: 5px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
  }
`;
