import styled from 'styled-components';

export const StyledList = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &:not(:first-child) {
        border-left: 1px solid ${ props => props.theme.colors.primary };
    }

`;

export const StyledListItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 34px;

    &:nth-child(odd) {
        background-color: ${props => props.alternateRows ? props.theme.colors.background + '33' : 'transparent'};
    }
`;

export const StyledItemLabel = styled.div`
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
`;

export const StyledItemValue = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 300;
    opacity: 1;
`;