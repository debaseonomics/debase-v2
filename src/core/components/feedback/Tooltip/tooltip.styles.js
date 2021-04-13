import styled from 'styled-components';

export const StyledTooltipWrapper = styled.div`

`;

export const StyledTooltipContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000000;
    user-select: none;
    pointer-events: none;
`;

export const StyledTooltip = styled.div`
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background};
    border: 2px solid ${props => props.theme.colors.secundaryLight};
    box-shadow: ${props => props.theme.shadows.secundary};
    border-radius: 10px;
    max-width: 300px;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 150%;
    user-select: none;
    pointer-events none;
`;