import styled from 'styled-components';

export const StyledDisconnectedWalletCard = styled.div`
    position: relative;
    width: 100%;
`;

export const StyledDisconnectedWalletDecoration = styled.div`
    position: absolute;
    top: 15%;
    left: 20%;
    width: 190px;
    height: 190px;
    transform: rotate(30deg);
    user-select: none;
    pointer-events: none;
    z-index: 0;
    opacity: .05;
    color: ${ props => props.theme.colors.primary };
    fill: ${ props => props.theme.colors.primary };
    flex-shrink: 0;

    svg {
        width: 100%;
        height: 100%;
    }
`;

export const StyledContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding: 75px 0;
    z-index: 1;
`;

export const StyledContentHeading = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 20px;
    padding-bottom: 15px;
`;

export const StyledContentFooter = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-grow: 1;
    padding-top: 60px;
`;