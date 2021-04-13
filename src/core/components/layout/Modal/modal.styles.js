import styled, { css } from 'styled-components';

export const StyledBackdrop = styled.div`
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${ props => props.theme.text };
    opacity: .4;
    user-select: none;
    overflow: hidden;
`;

export const StyledModal = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 2;
    position: absolute;
    padding: 0;
    margin: 0;
    border: 0;
    border-radius: 5px;
    background-color: ${ props => props.theme.colors.background };
    box-shadow: ${ props => props.theme.shadows.textLarge };
    user-select: none;
    overflow: hidden;
`;

export const StyledModalHeader = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    ${ props => props.isMovable ? css`
        cursor: move;
    ` : '' }

    ${ props => props.headerDivider ? css`
        border-bottom: 1px solid ${ props => props.theme.colors.border };
    ` : '' }
`;

export const StyledModalActions = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 5px;
`;

export const StyledModalContent = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex-flow: column;
    overflow: hidden;
`;

export const StyledModalFooter = styled.div`
    padding: 12px 20px;
    display: flex;
    flex-direction: column;

    ${ props => props.footerDivider ? css`
        border-top: 1px solid ${ props => props.theme.colors.border };
    ` : '' }
`;

export const StyledModalResizer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 18px;
    width: 18px;
    opacity: .2;
    transition: .1s ease all;
    cursor: nwse-resize;

    &:hover {
        opacity: 1;
    }

    svg {
        transform: rotate(45deg);
        height: 12px;
        width: 12px;
    }

`;
