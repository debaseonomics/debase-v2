import styled from 'styled-components';

export const StyledSidebar = styled.div`
    position: relative;    
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 240px;
    margin: 30px;
`;

export const StyledLogo = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    border: 3px solid ${props => props.theme.colors.text};
    border-radius: 10px;
    box-shadow: ${props => props.theme.shadows.secundary};
    height: 95px;
`;

export const StyledLogoText = styled.div`
    position: relative;
    padding: 0;
    margin: 0;
    font-family: 'bladerunner', sans-serif;
    font-size: 36px;
    font-weight: 500;
    line-height: 100%;
    text-transform: lowercase;
    color: ${ props => props.theme.colors.text };
    text-shadow: ${props => props.theme.shadows.secundaryText};
    user-select: none;
`;

export const StyledSection = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => props.theme.colors.background};
    border: 3px solid ${props => props.theme.colors.primaryLight};
    border-radius: 10px;
    box-shadow: ${props => props.theme.shadows.primary};
    padding: 25px;

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

export const StyledSocialList = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

export const StyledSocialIcon = styled.a`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme.colors.primaryLight};
    fill: ${props => props.theme.colors.primaryLight};
    filter: drop-shadow(${props => props.theme.shadows.primaryText});

    svg {
        width: 20px;
        height: 20px;
    }
`;