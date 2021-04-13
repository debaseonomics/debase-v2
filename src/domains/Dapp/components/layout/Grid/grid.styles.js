import styled from 'styled-components';

export const StyledGrid = styled.div`
    position: relative;
    display: grid;
    gap: 60px;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    grid-auto-rows: max-content;
    flex-grow: 1;
`;