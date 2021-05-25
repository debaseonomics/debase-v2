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

    @media only screen and (max-width: 420px) {
        display: none;
    }
`;

export const StyledAccountContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    user-select: none;

    @media only screen and (max-width: 420px) {
        gap: 6px;
        justify-content: flex-end;
    }
`;

export const StyledAccountAddress = styled.div`
    position: relative;
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media only screen and (max-width: 420px) {
        width: 60px;
        padding: 4px;
        align-self: center;
        border: 1px solid white;
        font-size: 9px;
        border-radius: 3px;
    }
`;

export const StyledDebaseLogo = styled.img`
    position: relative;
`;

export const StyledMobileTopbar = styled.div`
    display: none;
    @media only screen and (max-width: 420px) {
        display: flex;
        flex-direction: column;
        margin-top: -25px;
        padding: 0px 20px;
    }
`;

export const StyledMobileTopbarContainer = styled.div`
    display: flex;
    flex: 1;
    margin-bottom: 30px;
`;

export const StyledMobileLeftContainer = styled.div`
    flex: 1;
    align-self: center
`;

export const StyledMobileMiddleContainer = styled.div`
    display: flex;
    flex: 1;
`;

export const StyledMobileRightContainer = styled.div`
    flex: 1;
    justify-content: flex-end;
    padding-top: 3px;
`;

export const StyledMobileSideItem = styled.div`
    width: 16px;
    border: 1px solid #FFF;
    margin-bottom: 5px;
`;

export const StyledMobileTitleContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.background};
    border: 3px solid ${props => props.theme.colors.primaryLight};
    border-radius: 10px;
    box-shadow: ${props => props.theme.shadows.primary};
    width: 160px;
    height: 32px;

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

    @media only screen and (min-width: 420px) {
        display: none;
    }
`;