import styled from 'styled-components';

export const StyledDapp = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    height: 100vh;
    width: 100vw;
`;

export const StyledPage = styled.div`
    position: relative;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
`;

export const StyledPageInner = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    width: 100%;
    margin: 30px;
`

export const StyledContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 90px;
    padding: 90px 0 30px 0;
`;