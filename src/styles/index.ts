import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    background: linear-gradient( 90deg, rgba(187,214,255,0.08) 35.51%, rgba(6,106,255,0.53) 100% );
    height: 100vh;
`;

export const Panel = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #f1f1f1;
    margin: 20px;
    box-shadow: 0 0 50px -10px #0057d99e;
    padding: 10px 5% 10px 5%;
`;

export const View = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    height: 100%
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

interface PropsGrid{
    gap?: number;
    templateColumns?: string;
}

export const Grid = styled.div<PropsGrid>`
    display: grid;
    gap: ${(props) => `${props.gap}px`};
    grid-template-columns: ${(props) => props.templateColumns};
    align-items: flex-end;
`;
