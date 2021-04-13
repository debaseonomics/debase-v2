import styled from 'styled-components';

export const StyledProgress = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
`;

export const StyledBar = styled.div`
    position: relative;
    height: 6px;
    flex-grow: 1;
    background-color: ${props => props.theme.colors.secundary}1A;
    border-radius: 10px;
`;

export const StyledBarInner = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.secundaryLight};
    box-shadow: ${props => props.theme.shadows.secundary};
    border-radius: 10px;
`;

export const StyledIndicator = styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export const StyledIndicatorInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    border: 3px solid ${props => props.theme.colors.secundaryLight};
    box-shadow: ${props => props.theme.shadows.secundary};

    &:before {
        content: '';
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background-color: ${props => props.theme.colors.secundaryLight};
        box-shadow: ${props => props.theme.shadows.secundary};
    }
`;

export const StyledTotal = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    gap: 15px;
`;