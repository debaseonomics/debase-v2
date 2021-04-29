import styled from 'styled-components';

export const StyledSnackbarManager = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 10px;
    position: absolute;
    bottom: 30px;
    right: 30px;
    z-index: 1060;
    user-select: none;
    pointer-events: none;
`;