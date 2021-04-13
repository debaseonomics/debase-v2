import styled, { css } from 'styled-components';

export const StyledPanel = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: auto;
    z-index: 1000;
    display: flex;
    flex-flow: column;
    height: 100%;
    background-color: ${ props => props.theme.colors.background };
    border-right: 1px solid ${ props => props.theme.colors.border };
    box-shadow: ${ props => props.theme.shadows.textMedium };

    ${ props => props.pinned ? css`
        position: relative;
    ` : '' }
`;

export const StyledPanelResizer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    height: 100px;
    cursor: ew-resize;
    opacity: .2;
    transition: .1s ease all;

    &:hover {
        opacity: 1;
    }

    svg {
        height: 16px;
        width: 16px;
    }

`;

export const StyledPanelHeader = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    border-bottom: 1px solid ${ props => props.theme.colors.border };
`;

export const StyledPanelActions = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 5px;
`;

export const StyledPanelContent = styled.div`
    display: flex;
    flex-flow: column;
    padding-top: 15px;
`;