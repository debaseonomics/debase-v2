import styled from 'styled-components';

export const StyledCountdown = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
`;

export const StyledUnit = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
`;

export const StyledTime = styled.div`
    font-family: 'bladerunner', sans-serif;
    line-height: 100%;
    user-select: none;
    pointer-events: none;
    font-size: 70px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: lowercase;
    text-shadow: ${props => props.theme.shadows.secundaryText};
    color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${props => props.theme.colors.secundaryLight};
    padding-bottom: 15px;
`;

export const StyledLabel = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;