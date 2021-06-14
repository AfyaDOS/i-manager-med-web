import styled from 'styled-components';
import { makeStyles } from '../../utils';

export const CardHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  height: 40px;
  background: white;

  img {
    width: 233px;
    height: 60px;
    object-fit: contain;
  }
`;

export default makeStyles.create({ buttonLogin: { marginLeft: 'auto' } });
