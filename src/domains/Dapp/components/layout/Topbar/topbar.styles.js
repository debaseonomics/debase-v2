import styled from 'styled-components';

/* main style */
export const StyledTopbar = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.background};
    border: 3px solid ${props => props.theme.colors.primaryLight};
    border-radius: 10px;
    box-shadow: ${props => props.theme.shadows.primary};
    height: 95px;
    padding: 30px;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: ${props => props.theme.colors.primary};
        border-radius: 5px;
        opacity: .05;
    }
`;

export const StyledAccountContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    user-select: none;
`;

export const StyledAccountAddress = styled.div`
    position: relative;
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;