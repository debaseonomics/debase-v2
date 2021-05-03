import styled from 'styled-components';

export const StyledSnackbar = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.background};
    border-radius: 5px;
    border: 2px solid ${props => props.theme.colors[props.status]};
    box-shadow: ${props => props.theme.shadows[props.status]};
    padding: 14px 20px;
    pointer-events: auto;
    cursor: pointer;
`;